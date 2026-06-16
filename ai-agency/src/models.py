from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any


@dataclass
class ExpertProfile:
    id: str
    name: str
    division: str
    description: str
    emoji: str
    color: str
    vibe: str
    file_path: str
    prompt_path: str | None = None
    prompt_body: str | None = None

    def to_dict(self) -> dict[str, Any]:
        data = {
            "id": self.id,
            "name": self.name,
            "division": self.division,
            "description": self.description,
            "emoji": self.emoji,
            "color": self.color,
            "vibe": self.vibe,
            "file_path": self.file_path,
            "prompt_path": self.prompt_path,
        }
        if self.prompt_body:
            data["prompt_body"] = self.prompt_body
        return data

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> ExpertProfile:
        return cls(
            id=data["id"],
            name=data["name"],
            division=data["division"],
            description=data.get("description", ""),
            emoji=data.get("emoji", ""),
            color=data.get("color", ""),
            vibe=data.get("vibe", ""),
            file_path=data["file_path"],
            prompt_path=data.get("prompt_path"),
            prompt_body=data.get("prompt_body"),
        )


@dataclass
class HandoffContext:
    project: str = ""
    phase: str = ""
    from_agent: str = ""
    prior_outputs: list[str] = field(default_factory=list)
    metadata: dict[str, Any] = field(default_factory=dict)

    def summary(self) -> str:
        if not self.prior_outputs:
            return ""
        blocks = []
        for idx, output in enumerate(self.prior_outputs, start=1):
            blocks.append(f"### Prior step {idx}\n{output}")
        return "\n\n".join(blocks)


@dataclass
class Deliverable:
    agent_id: str
    agent_name: str
    content: str
    created_at: str = field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )

    def to_handoff_block(self) -> str:
        return (
            f"**From**: {self.agent_name} ({self.agent_id})\n"
            f"**At**: {self.created_at}\n\n"
            f"{self.content}"
        )


@dataclass
class NexusStep:
    agent_name: str
    role: str
    action: str


@dataclass
class NexusRunResult:
    scenario: str
    steps: list[Deliverable] = field(default_factory=list)

    def final_answer(self) -> str:
        if not self.steps:
            return ""
        return self.steps[-1].content
