from __future__ import annotations

import json
from functools import lru_cache
from pathlib import Path

from paths import PROJECT_ROOT

LOCALE_PATH = PROJECT_ROOT / "data" / "locale_zh.json"


@lru_cache(maxsize=1)
def load_locale() -> dict:
    if not LOCALE_PATH.exists():
        return {"divisions": {}, "experts": {}}
    return json.loads(LOCALE_PATH.read_text(encoding="utf-8"))


def division_zh(division: str) -> str:
    return load_locale().get("divisions", {}).get(division, division)


def expert_name_zh(expert_id: str, fallback_name: str = "") -> str:
    value = load_locale().get("experts", {}).get(expert_id)
    return value or fallback_name


def division_label(division: str) -> str:
    zh = division_zh(division)
    if zh == division:
        return division
    return f"{division} - {zh}"


def expert_label(name: str, expert_id: str) -> str:
    zh = expert_name_zh(expert_id, name)
    if zh == name:
        return name
    return f"{name} - {zh}"


def expert_header(name: str, expert_id: str) -> str:
    return f"{expert_label(name, expert_id)} ({expert_id})"


def enrich_expert(expert_dict: dict) -> dict:
    expert_id = expert_dict["id"]
    name = expert_dict["name"]
    division = expert_dict["division"]
    name_zh = expert_name_zh(expert_id, name)
    division_zh_name = division_zh(division)
    enriched = dict(expert_dict)
    enriched.update(
        {
            "name_zh": name_zh,
            "division_zh": division_zh_name,
            "label": expert_label(name, expert_id),
            "division_label": division_label(division),
        }
    )
    return enriched
