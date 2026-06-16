from __future__ import annotations

from agent import AgentFactory
from models import HandoffContext, NexusRunResult, NexusStep


INCIDENT_P1_PIPELINE: list[NexusStep] = [
    NexusStep(
        agent_name="Infrastructure Maintainer",
        role="Incident commander",
        action=(
            "Acknowledge the incident, assess scope and impact, classify severity, "
            "and define the immediate response plan."
        ),
    ),
    NexusStep(
        agent_name="DevOps Automator",
        role="Deployment support",
        action=(
            "Based on the incident commander's assessment, propose rollback, "
            "mitigation, or deployment actions with concrete commands."
        ),
    ),
    NexusStep(
        agent_name="Backend Architect",
        role="Root cause investigation",
        action=(
            "Investigate likely backend/system root causes and propose a fix plan "
            "with validation steps."
        ),
    ),
    NexusStep(
        agent_name="Support Responder",
        role="User communication",
        action=(
            "Draft a concise user-facing status update and internal stakeholder note "
            "based on the investigation so far."
        ),
    ),
]


class NexusMicroRunner:
    """Sequential NEXUS-Micro runner — proof that multi-agent handoff works."""

    def __init__(self, factory: AgentFactory):
        self.factory = factory

    def run_incident_p1(
        self, incident: str, thinking_mode: str = "fast"
    ) -> NexusRunResult:
        context = HandoffContext(
            project="incident-response",
            phase="NEXUS-Micro / P1",
            metadata={"scenario": "scenario-incident-response", "severity": "P1"},
        )
        deliverables = []

        for step in INCIDENT_P1_PIPELINE:
            agent = self.factory.get_by_name(step.agent_name)
            task = (
                f"Incident report:\n{incident}\n\n"
                f"Your role in this step: {step.role}\n"
                f"Required action: {step.action}"
            )
            deliverable = agent.run(task, context=context, thinking_mode=thinking_mode)
            deliverables.append(deliverable)
            context.from_agent = deliverable.agent_name
            context.prior_outputs.append(deliverable.to_handoff_block())

        return NexusRunResult(scenario="incident-response-p1", steps=deliverables)
