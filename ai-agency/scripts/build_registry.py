#!/usr/bin/env python3
from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from expert_registry import build_registry  # noqa: E402
from paths import PROJECT_ROOT, resolve_registry_path, resolve_agency_root  # noqa: E402


def main() -> None:
    parser = argparse.ArgumentParser(description="Build agency expert registry (S0)")
    parser.add_argument(
        "--agency-root",
        type=Path,
        default=None,
        help="Path to agency-agents/agency-agents",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=PROJECT_ROOT / "registry" / "registry.json",
        help="Output registry.json path",
    )
    parser.add_argument(
        "--embed-prompts",
        action="store_true",
        help="Embed expert markdown bodies into registry.json (required for Vercel)",
    )
    args = parser.parse_args()

    agency_root = args.agency_root or resolve_agency_root()
    if not agency_root.exists():
        raise SystemExit(
            f"agency root not found: {agency_root}\n"
            "Run: bash scripts/setup_data.sh"
        )

    payload = build_registry(
        agency_root,
        args.output,
        project_root=PROJECT_ROOT,
        embed_prompts=args.embed_prompts,
    )
    print(f"registry built: {args.output}")
    print(f"experts: {payload['expert_count']}")
    print(f"source:  {payload['source_root']}")


if __name__ == "__main__":
    main()
