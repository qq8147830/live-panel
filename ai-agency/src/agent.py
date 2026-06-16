from __future__ import annotations

from typing import Generator

from expert_registry import ExpertRegistry
from llm import LLMClient, ThinkingMode, normalize_thinking_mode
from models import Deliverable, ExpertProfile, HandoffContext


class Agent:
    """Minimal agency agent runtime."""

    def __init__(
        self,
        profile: ExpertProfile,
        registry: ExpertRegistry,
        llm: LLMClient,
    ):
        self.profile = profile
        self.registry = registry
        self.llm = llm

    @property
    def id(self) -> str:
        return self.profile.id

    @property
    def name(self) -> str:
        return self.profile.name

    def build_system_prompt(self) -> str:
        body = self.registry.load_system_prompt(self.profile)
        meta_lines = [
            f"# Role: {self.profile.name}",
            f"Division: {self.profile.division}",
        ]
        if self.profile.description:
            meta_lines.append(f"Description: {self.profile.description}")
        if self.profile.vibe:
            meta_lines.append(f"Vibe: {self.profile.vibe}")

        return (
            "\n".join(meta_lines)
            + "\n\n## Agency Instructions\n"
            + body
            + "\n\n## Runtime Rules\n"
            + "1. Stay in character for this expert.\n"
            + "2. Be concrete and actionable.\n"
            + "3. If prior handoff context exists, build on it instead of restarting.\n"
        )

    def _build_user_prompt(self, task: str, context: HandoffContext) -> str:
        user_parts = [f"## Task\n{task}"]
        handoff = context.summary()
        if handoff:
            user_parts.append("## Handoff Context\n" + handoff)
        if context.metadata:
            meta = "\n".join(f"- {key}: {value}" for key, value in context.metadata.items())
            user_parts.append("## Metadata\n" + meta)
        return "\n\n".join(user_parts)

    def run(
        self,
        task: str,
        context: HandoffContext | None = None,
        thinking_mode: ThinkingMode | str = "fast",
    ) -> Deliverable:
        context = context or HandoffContext()
        mode = normalize_thinking_mode(
            thinking_mode if isinstance(thinking_mode, str) else thinking_mode
        )
        content = self.llm.chat(
            system_prompt=self.build_system_prompt(),
            user_prompt=self._build_user_prompt(task, context),
            thinking_mode=mode,
        )
        return Deliverable(
            agent_id=self.id,
            agent_name=self.name,
            content=content,
        )

    def run_stream(
        self,
        task: str,
        context: HandoffContext | None = None,
        thinking_mode: ThinkingMode | str = "fast",
    ) -> Generator[str, None, None]:
        context = context or HandoffContext()
        mode = normalize_thinking_mode(
            thinking_mode if isinstance(thinking_mode, str) else thinking_mode
        )
        yield from self.llm.chat_stream(
            system_prompt=self.build_system_prompt(),
            user_prompt=self._build_user_prompt(task, context),
            thinking_mode=mode,
        )


class AgentFactory:
    def __init__(self, registry: ExpertRegistry, llm: LLMClient):
        self.registry = registry
        self.llm = llm
        self._cache: dict[str, Agent] = {}

    def get(self, expert_id: str) -> Agent:
        if expert_id in self._cache:
            return self._cache[expert_id]

        profile = self.registry.get(expert_id)
        if profile is None:
            raise KeyError(f"Expert not found: {expert_id}")

        agent = Agent(profile=profile, registry=self.registry, llm=self.llm)
        self._cache[expert_id] = agent
        return agent

    def get_by_name(self, name: str) -> Agent:
        profile = self.registry.find_by_name_fuzzy(name)
        if profile is None:
            raise KeyError(f"Expert not found by name: {name}")
        return self.get(profile.id)
