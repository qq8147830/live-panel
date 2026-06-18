from __future__ import annotations

import sys
import time
from pathlib import Path
from typing import Generator

from dotenv import load_dotenv

SRC = Path(__file__).resolve().parent
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from agent import AgentFactory  # noqa: E402
from expert_registry import ExpertRegistry, build_registry  # noqa: E402
from llm import LLMClient, LLMConfig, estimate_seconds, normalize_thinking_mode  # noqa: E402
from models import Deliverable, NexusRunResult, NexusStep  # noqa: E402
from nexus_micro import INCIDENT_P1_PIPELINE, NexusMicroRunner  # noqa: E402
from i18n import division_label, enrich_expert, expert_header  # noqa: E402
from paths import PROJECT_ROOT, resolve_agency_root, resolve_registry_path  # noqa: E402


class AgencyService:
    def __init__(self) -> None:
        load_dotenv(PROJECT_ROOT / ".env", override=True)
        self.project_root = PROJECT_ROOT
        self.agency_root = resolve_agency_root()
        self.registry_path = resolve_registry_path()
        self._ensure_registry()
        self.registry = ExpertRegistry(self.registry_path, project_root=self.project_root)
        self._factory: AgentFactory | None = None

    def _ensure_registry(self) -> None:
        if self.registry_path.exists():
            return
        if self.agency_root.exists():
            build_registry(
                self.agency_root,
                self.registry_path,
                project_root=self.project_root,
                embed_prompts=False,
            )

    def _get_factory(self) -> AgentFactory:
        if self._factory is None:
            self._factory = AgentFactory(self.registry, LLMClient(LLMConfig.from_env()))
        return self._factory

    def _resolve_agent(self, message: str, expert_id: str):
        factory = self._get_factory()
        if expert_id:
            agent = factory.get(expert_id)
            return agent, False
        matches = self.registry.search(message, top_k=1)
        if not matches:
            agent = factory.get(self.registry.fallback_expert().id)
            return agent, True
        agent = factory.get(matches[0].id)
        return agent, True

    def health(self) -> dict:
        registry_exists = self.registry_path.exists()
        embedded = getattr(self.registry, "embedded_prompts", False)
        return {
            "status": "ok" if self.registry.experts else "degraded",
            "experts": len(self.registry.experts),
            "divisions": [
                {"id": division, "label": division_label(division)}
                for division in self.registry.list_divisions()
            ],
            "agency_root": str(self.agency_root),
            "agency_exists": self.agency_root.exists(),
            "registry": str(self.registry_path),
            "registry_exists": registry_exists,
            "embedded_prompts": embedded,
            "project_root": str(self.project_root),
            "thinking_modes": ["fast", "deep"],
            "deploy_hint": (
                None
                if self.registry.experts
                else "registry/registry.json missing or empty — commit embedded registry for Vercel"
            ),
        }

    def list_experts(self, division: str = "", query: str = "", limit: int = 50) -> list[dict]:
        items = self.registry.experts
        if division:
            items = [item for item in items if item.division == division]
        if query:
            items = self.registry.search(query, top_k=limit)
        return [enrich_expert(item.to_dict()) for item in items[:limit]]

    def micro_pipeline_info(self) -> list[dict]:
        steps: list[dict] = []
        for index, step in enumerate(INCIDENT_P1_PIPELINE, start=1):
            profile = self.registry.find_by_name_fuzzy(step.agent_name)
            agent_id = profile.id if profile else ""
            steps.append(
                {
                    "step": index,
                    "agent_id": agent_id,
                    "agent_name": step.agent_name,
                    "agent_label": expert_header(step.agent_name, agent_id),
                    "role": step.role,
                    "action": step.action,
                }
            )
        return steps

    def chat(self, message: str, expert_id: str = "", thinking_mode: str = "fast") -> dict:
        mode = normalize_thinking_mode(thinking_mode)
        agent, routed = self._resolve_agent(message, expert_id)
        est_low, est_high = estimate_seconds(mode)

        start = time.perf_counter()
        deliverable = agent.run(message, thinking_mode=mode)
        elapsed_ms = int((time.perf_counter() - start) * 1000)

        return {
            "expert_id": deliverable.agent_id,
            "expert_name": deliverable.agent_name,
            "expert_label": expert_header(deliverable.agent_name, deliverable.agent_id),
            "routed": routed,
            "response": deliverable.content,
            "thinking_mode": mode,
            "elapsed_ms": elapsed_ms,
            "estimate_seconds": {"low": est_low, "high": est_high},
        }

    def chat_stream_events(
        self, message: str, expert_id: str = "", thinking_mode: str = "fast"
    ) -> Generator[dict, None, None]:
        mode = normalize_thinking_mode(thinking_mode)
        agent, routed = self._resolve_agent(message, expert_id)
        est_low, est_high = estimate_seconds(mode)

        yield {
            "type": "meta",
            "expert_id": agent.id,
            "expert_name": agent.name,
            "expert_label": expert_header(agent.name, agent.id),
            "routed": routed,
            "thinking_mode": mode,
            "estimate_seconds": {"low": est_low, "high": est_high},
        }

        start = time.perf_counter()
        parts: list[str] = []
        for chunk in agent.run_stream(message, thinking_mode=mode):
            parts.append(chunk)
            yield {"type": "chunk", "content": chunk}

        elapsed_ms = int((time.perf_counter() - start) * 1000)
        yield {
            "type": "done",
            "elapsed_ms": elapsed_ms,
            "response": "".join(parts),
        }

    def run_micro(self, incident: str, thinking_mode: str = "fast") -> dict:
        mode = normalize_thinking_mode(thinking_mode)
        est_low, est_high = estimate_seconds(mode, micro_steps=4)

        factory = self._get_factory()
        runner = NexusMicroRunner(factory)

        start = time.perf_counter()
        result = runner.run_incident_p1(incident, thinking_mode=mode)
        elapsed_ms = int((time.perf_counter() - start) * 1000)

        return self._format_micro_result(result, mode, elapsed_ms, est_low, est_high)

    def run_micro_stream_events(
        self, incident: str, thinking_mode: str = "fast"
    ) -> Generator[dict, None, None]:
        mode = normalize_thinking_mode(thinking_mode)
        est_low, est_high = estimate_seconds(mode, micro_steps=4)

        factory = self._get_factory()
        runner = NexusMicroRunner(factory)

        yield {
            "type": "meta",
            "scenario": "incident-response-p1",
            "thinking_mode": mode,
            "estimate_seconds": {"low": est_low, "high": est_high},
            "total_steps": len(INCIDENT_P1_PIPELINE),
            "pipeline": self.micro_pipeline_info(),
        }

        start = time.perf_counter()
        result: NexusRunResult | None = None

        for event, payload in runner.iter_incident_p1(incident, thinking_mode=mode):
            if event == "step_start":
                data = payload  # type: ignore[assignment]
                step: NexusStep = data["pipeline_step"]
                profile = self.registry.find_by_name_fuzzy(step.agent_name)
                agent_id = profile.id if profile else ""
                yield {
                    "type": "step_start",
                    "step": data["step"],
                    "total_steps": data["total_steps"],
                    "agent_id": agent_id,
                    "agent_name": step.agent_name,
                    "agent_label": expert_header(step.agent_name, agent_id),
                    "role": step.role,
                    "thinking_mode": mode,
                }
            elif event == "step_done":
                data = payload  # type: ignore[assignment]
                deliverable: Deliverable = data["deliverable"]
                yield {
                    "type": "step_done",
                    "step": data["step"],
                    "total_steps": data["total_steps"],
                    "agent_id": deliverable.agent_id,
                    "agent_name": deliverable.agent_name,
                    "elapsed_ms": None,
                }
            elif event == "complete":
                result = payload  # type: ignore[assignment]

        if result is None:
            raise RuntimeError("NEXUS-Micro pipeline produced no result.")

        elapsed_ms = int((time.perf_counter() - start) * 1000)
        formatted = self._format_micro_result(result, mode, elapsed_ms, est_low, est_high)
        yield {
            "type": "done",
            "scenario": formatted["scenario"],
            "thinking_mode": formatted["thinking_mode"],
            "elapsed_ms": formatted["elapsed_ms"],
            "estimate_seconds": formatted["estimate_seconds"],
            "steps": formatted["steps"],
            "final_response": formatted["final_response"],
        }

    def _format_micro_result(
        self,
        result: NexusRunResult,
        mode: str,
        elapsed_ms: int,
        est_low: int,
        est_high: int,
    ) -> dict:
        return {
            "scenario": result.scenario,
            "thinking_mode": mode,
            "elapsed_ms": elapsed_ms,
            "estimate_seconds": {"low": est_low, "high": est_high},
            "pipeline": self.micro_pipeline_info(),
            "steps": [
                {
                    "agent_id": step.agent_id,
                    "agent_name": step.agent_name,
                    "agent_label": expert_header(step.agent_name, step.agent_id),
                    "content": step.content,
                    "created_at": step.created_at,
                }
                for step in result.steps
            ],
            "final_response": result.final_answer(),
        }


_service: AgencyService | None = None


def get_service() -> AgencyService:
    global _service
    if _service is None:
        _service = AgencyService()
    return _service
