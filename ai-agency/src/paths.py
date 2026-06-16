from __future__ import annotations

import os
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
SRC_ROOT = PROJECT_ROOT / "src"
STATIC_DIR = PROJECT_ROOT / "static"
DEFAULT_PORT = 18888


def _registry_candidates() -> list[Path]:
    candidates = [
        PROJECT_ROOT / "registry" / "registry.json",
        Path("/var/task/ai-agency/registry/registry.json"),
        Path("/var/task/registry/registry.json"),
    ]
    env_path = os.getenv("REGISTRY_PATH", "").strip()
    if env_path:
        candidates.insert(0, Path(env_path))
    seen: set[str] = set()
    unique: list[Path] = []
    for path in candidates:
        key = str(path)
        if key not in seen:
            seen.add(key)
            unique.append(path)
    return unique


def resolve_registry_path() -> Path:
    for candidate in _registry_candidates():
        if candidate.exists():
            return candidate
    return _registry_candidates()[0]


REGISTRY_PATH = resolve_registry_path()


def agency_root_candidates() -> list[Path]:
    return [
        PROJECT_ROOT / "data" / "agency-agents",
        PROJECT_ROOT.parent / "agency-agents" / "agency-agents",
        Path("/var/task/data/agency-agents"),
        Path("/var/task/ai-agency/data/agency-agents"),
    ]


def resolve_agency_root() -> Path:
    for candidate in agency_root_candidates():
        if candidate.exists():
            return candidate
    return agency_root_candidates()[0]
