from __future__ import annotations

import json
import re
from pathlib import Path

import yaml

from models import ExpertProfile
from i18n import division_zh, expert_name_zh

SKIP_DIRS = {
    ".git",
    ".github",
    "examples",
    "integrations",
    "scripts",
    "strategy",
}

SKIP_FILE_PREFIXES = ("README", "CONTRIBUTING", "LICENSE")


def _parse_frontmatter(content: str) -> tuple[dict, str]:
    if not content.startswith("---"):
        return {}, content

    parts = content.split("---", 2)
    if len(parts) < 3:
        return {}, content

    try:
        meta = yaml.safe_load(parts[1]) or {}
    except yaml.YAMLError:
        meta = {}

    body = parts[2].strip()
    return meta, body


def scan_experts(
    agency_root: Path,
    project_root: Path | None = None,
    path_prefix: str = "",
) -> list[ExpertProfile]:
    experts: list[ExpertProfile] = []
    project_root = project_root or agency_root

    for division_dir in sorted(agency_root.iterdir()):
        if not division_dir.is_dir():
            continue
        if division_dir.name in SKIP_DIRS:
            continue

        for md_file in sorted(division_dir.glob("*.md")):
            if md_file.name.startswith(SKIP_FILE_PREFIXES):
                continue

            content = md_file.read_text(encoding="utf-8")
            meta, _body = _parse_frontmatter(content)

            name = str(meta.get("name") or md_file.stem.replace("-", " ").title())
            description = str(meta.get("description") or "")

            if path_prefix:
                stored_path = f"{path_prefix}/{division_dir.name}/{md_file.name}"
            else:
                try:
                    relative_path = md_file.resolve().relative_to(project_root.resolve())
                    stored_path = str(relative_path).replace("\\", "/")
                except ValueError:
                    stored_path = str(md_file.resolve())

            experts.append(
                ExpertProfile(
                    id=md_file.stem,
                    name=name,
                    division=division_dir.name,
                    description=description,
                    emoji=str(meta.get("emoji") or ""),
                    color=str(meta.get("color") or ""),
                    vibe=str(meta.get("vibe") or ""),
                    file_path=stored_path,
                )
            )

    experts.sort(key=lambda item: (item.division, item.name.lower()))
    return experts


def build_registry(
    agency_root: Path,
    output_path: Path,
    project_root: Path | None = None,
) -> dict:
    project_root = project_root or output_path.parents[1]
    data_agency = project_root / "data" / "agency-agents"
    if data_agency.exists() and agency_root.resolve() == data_agency.resolve():
        path_prefix = "data/agency-agents"
        source_root = "data/agency-agents"
    else:
        path_prefix = ""
        try:
            source_root = str(agency_root.resolve().relative_to(project_root.resolve())).replace("\\", "/")
        except ValueError:
            source_root = str(agency_root.resolve())

    experts = scan_experts(agency_root, project_root=project_root, path_prefix=path_prefix)
    payload = {
        "version": 1,
        "source_root": source_root,
        "expert_count": len(experts),
        "experts": [expert.to_dict() for expert in experts],
    }
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    return payload


class ExpertRegistry:
    def __init__(self, registry_path: Path, project_root: Path | None = None):
        self.registry_path = registry_path
        self.project_root = project_root or registry_path.parents[1]
        payload = json.loads(registry_path.read_text(encoding="utf-8"))
        self.source_root = payload.get("source_root", "")
        self.experts: list[ExpertProfile] = [
            ExpertProfile.from_dict(item) for item in payload.get("experts", [])
        ]
        self._by_id = {expert.id: expert for expert in self.experts}
        self._by_name = {expert.name.lower(): expert for expert in self.experts}
        self._prompt_cache: dict[str, str] = {}

    @classmethod
    def from_agency_root(cls, agency_root: Path, cache_path: Path | None = None) -> ExpertRegistry:
        cache = cache_path or (agency_root.parent.parent / "ai-agency" / "registry" / "registry.json")
        if not cache.exists():
            build_registry(agency_root, cache)
        return cls(cache)

    def get(self, expert_id: str) -> ExpertProfile | None:
        return self._by_id.get(expert_id)

    def get_by_name(self, name: str) -> ExpertProfile | None:
        return self._by_name.get(name.lower())

    def find_by_name_fuzzy(self, name: str) -> ExpertProfile | None:
        exact = self.get_by_name(name)
        if exact:
            return exact

        needle = name.lower()
        for expert in self.experts:
            if needle in expert.name.lower():
                return expert

        slug = re.sub(r"[^a-z0-9]+", "-", needle).strip("-")
        for expert in self.experts:
            if slug and slug in expert.id:
                return expert

        return None

    def search(self, query: str, top_k: int = 5) -> list[ExpertProfile]:
        query_lower = query.lower()
        scored: list[tuple[int, ExpertProfile]] = []

        for expert in self.experts:
            name_zh = expert_name_zh(expert.id, expert.name)
            div_zh = division_zh(expert.division)
            haystack = " ".join(
                [
                    expert.name,
                    name_zh,
                    expert.division,
                    div_zh,
                    expert.description,
                    expert.id,
                ]
            ).lower()
            score = 0
            for token in re.findall(r"[\w\u4e00-\u9fff]+", query_lower):
                if token in haystack:
                    score += 3 if token in expert.name.lower() or token in name_zh else 1
            if score > 0:
                scored.append((score, expert))

        scored.sort(key=lambda item: item[0], reverse=True)
        return [expert for _, expert in scored[:top_k]]

    def resolve_prompt_path(self, expert: ExpertProfile) -> Path:
        path = Path(expert.file_path)
        if path.is_absolute():
            return path
        return self.project_root / path

    def load_system_prompt(self, expert: ExpertProfile) -> str:
        if expert.id in self._prompt_cache:
            return self._prompt_cache[expert.id]

        path = self.resolve_prompt_path(expert)
        if not path.exists():
            raise FileNotFoundError(
                f"Expert prompt not found: {path}. "
                "Run scripts/setup_data.sh and scripts/build_registry.py."
            )
        content = path.read_text(encoding="utf-8")
        _meta, body = _parse_frontmatter(content)
        self._prompt_cache[expert.id] = body
        return body

    def list_divisions(self) -> list[str]:
        return sorted({expert.division for expert in self.experts})
