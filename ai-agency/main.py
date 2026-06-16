#!/usr/bin/env python3
from __future__ import annotations

import argparse
import sys
from pathlib import Path

from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from agent import AgentFactory  # noqa: E402
from expert_registry import ExpertRegistry  # noqa: E402
from llm import LLMClient, LLMConfig  # noqa: E402
from nexus_micro import NexusMicroRunner  # noqa: E402


from paths import PROJECT_ROOT, REGISTRY_PATH, resolve_agency_root  # noqa: E402


def default_paths() -> tuple[Path, Path]:
    return resolve_agency_root(), REGISTRY_PATH


def ensure_registry(agency_root: Path, registry_path: Path) -> ExpertRegistry:
    if not registry_path.exists() and agency_root.exists():
        from expert_registry import build_registry

        build_registry(agency_root, registry_path, project_root=PROJECT_ROOT)
    return ExpertRegistry(registry_path, project_root=PROJECT_ROOT)


def cmd_registry(args: argparse.Namespace) -> None:
    registry = ensure_registry(args.agency_root, args.registry)
    print(f"Experts: {len(registry.experts)}")
    print(f"Divisions: {', '.join(registry.list_divisions())}")
    if args.query:
        matches = registry.search(args.query, top_k=args.top_k)
        print(f"\nSearch: {args.query}")
        for expert in matches:
            print(f"- {expert.name} [{expert.division}] :: {expert.description[:80]}")


def cmd_chat(args: argparse.Namespace) -> None:
    load_dotenv(ROOT / ".env", override=True)
    registry = ensure_registry(args.agency_root, args.registry)
    factory = AgentFactory(registry, LLMClient(LLMConfig.from_env()))

    if args.expert_id:
        agent = factory.get(args.expert_id)
    else:
        matches = registry.search(args.message, top_k=1)
        if not matches:
            raise SystemExit("No matching expert found.")
        agent = factory.get(matches[0].id)
        print(f"🎯 Routed to: {agent.name} ({agent.id})")

    deliverable = agent.run(args.message)
    print(f"\n🎭 {deliverable.agent_name}\n")
    print(deliverable.content)


def cmd_micro(args: argparse.Namespace) -> None:
    load_dotenv(ROOT / ".env", override=True)
    registry = ensure_registry(args.agency_root, args.registry)
    factory = AgentFactory(registry, LLMClient(LLMConfig.from_env()))
    runner = NexusMicroRunner(factory)

    print("🚨 Running NEXUS-Micro: incident-response / P1")
    result = runner.run_incident_p1(args.incident)

    for idx, step in enumerate(result.steps, start=1):
        print(f"\n{'=' * 60}")
        print(f"Step {idx}: {step.agent_name}")
        print("=" * 60)
        print(step.content)

    print(f"\n{'=' * 60}")
    print("Final handoff ready.")
    print("=" * 60)


def build_parser() -> argparse.ArgumentParser:
    agency_default, registry_default = default_paths()
    parser = argparse.ArgumentParser(description="AI Agency runtime (S0 + S1)")
    parser.add_argument("--agency-root", type=Path, default=agency_default)
    parser.add_argument("--registry", type=Path, default=registry_default)

    sub = parser.add_subparsers(dest="command", required=True)

    registry_cmd = sub.add_parser("registry", help="Inspect expert registry")
    registry_cmd.add_argument("--query", type=str, default="")
    registry_cmd.add_argument("--top-k", type=int, default=5)
    registry_cmd.set_defaults(func=cmd_registry)

    chat_cmd = sub.add_parser("chat", help="Single-agent chat (S1)")
    chat_cmd.add_argument("message", type=str, help="User message / task")
    chat_cmd.add_argument("--expert-id", type=str, default="")
    chat_cmd.set_defaults(func=cmd_chat)

    micro_cmd = sub.add_parser("micro", help="NEXUS-Micro incident P1 pipeline")
    micro_cmd.add_argument(
        "--incident",
        type=str,
        required=True,
        help="Incident description",
    )
    micro_cmd.set_defaults(func=cmd_micro)

    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
