from __future__ import annotations

from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
SRC_ROOT = PROJECT_ROOT / "src"
REGISTRY_PATH = PROJECT_ROOT / "registry" / "registry.json"
STATIC_DIR = PROJECT_ROOT / "static"
DEFAULT_PORT = 18888


def agency_root_candidates() -> list[Path]:
    return [
        PROJECT_ROOT / "data" / "agency-agents",
        PROJECT_ROOT.parent / "agency-agents" / "agency-agents",
    ]


def resolve_agency_root() -> Path:
    for candidate in agency_root_candidates():
        if candidate.exists():
            return candidate
    return agency_root_candidates()[0]
