from __future__ import annotations

import json
import os
import subprocess
from typing import Any

from esg_harness.models import BackendConfig


class LLMClient:
    def complete(self, role: str, prompt: str) -> str:
        raise NotImplementedError


class CommandClient(LLMClient):
    def __init__(self, backend: BackendConfig) -> None:
        if not backend.command:
            raise ValueError("Command backend requires a non-empty command list.")
        self._command = backend.command
        self._env = backend.env

    def complete(self, role: str, prompt: str) -> str:
        env = os.environ.copy()
        env.update(self._env)
        result = subprocess.run(
            self._command,
            input=prompt,
            text=True,
            capture_output=True,
            env=env,
            check=False,
        )
        if result.returncode != 0:
            message = result.stderr.strip() or result.stdout.strip() or "unknown error"
            raise RuntimeError(f"Agent command failed for role '{role}': {message}")
        return result.stdout.strip()


class DryRunClient(LLMClient):
    def complete(self, role: str, prompt: str) -> str:
        if role == "planner":
            return json.dumps(_planner_payload(prompt), indent=2)
        if role == "generator_contract":
            return json.dumps(_generator_contract_payload(prompt), indent=2)
        if role == "evaluator_contract":
            return json.dumps(_evaluator_contract_payload(prompt), indent=2)
        if role == "generator_sprint":
            return json.dumps(_generator_sprint_payload(prompt), indent=2)
        if role == "evaluator_sprint":
            return json.dumps(_evaluator_sprint_payload(prompt), indent=2)
        raise ValueError(f"Unsupported dry-run role: {role}")


def make_client(backend: BackendConfig) -> LLMClient:
    if backend.type == "dry-run":
        return DryRunClient()
    if backend.type == "command":
        return CommandClient(backend)
    raise ValueError(f"Unsupported backend type: {backend.type}")


def _extract_between(text: str, start_token: str, end_token: str) -> str:
    if start_token not in text or end_token not in text:
        return ""
    return text.split(start_token, 1)[1].split(end_token, 1)[0].strip()


def _sprint_meta(prompt: str) -> tuple[str, str]:
    sprint_id = _extract_between(prompt, "<sprint_id>", "</sprint_id>") or "SPRINT-01"
    sprint_name = _extract_between(prompt, "<sprint_name>", "</sprint_name>") or "Foundation"
    return sprint_id, sprint_name


def _planner_payload(prompt: str) -> dict[str, Any]:
    brief = _extract_between(prompt, "<brief>", "</brief>") or "Build an ESG application."
    return {
        "product_name": "ESG Mission Control",
        "summary": (
            "An ESG operations workspace that converts fragmented sustainability work into a "
            "single auditable operating system for data collection, narrative generation, and action tracking."
        ),
        "north_star": (
            "Help sustainability teams move from spreadsheet coordination to an auditable, AI-assisted workflow."
        ),
        "user_personas": [
            "Sustainability lead preparing disclosures and board updates.",
            "Operations manager providing facility and supplier evidence.",
            "Executive reviewer tracking risk, progress, and confidence.",
        ],
        "design_language": [
            "Data-dense but calm interface with strong hierarchy and minimal dashboard clutter.",
            "Evidence-first UX that exposes assumptions, provenance, and confidence near every metric.",
            "Avoid generic AI dashboard tropes; favor purposeful, trustworthy visual decisions.",
        ],
        "architecture": [
            "Frontend: React or similar SPA with clear workflow states for intake, review, and reporting.",
            "Backend: API service with strong audit logging around metric changes and AI-generated content.",
            "Storage: relational database for metrics, evidence, approvals, and sprint artifacts.",
        ],
        "data_sources": [
            "Utility usage exports, supplier questionnaires, and manual KPI uploads.",
            "Emission factor tables and policy reference documents.",
            "Internal notes, corrective actions, and approval records.",
        ],
        "compliance_considerations": [
            "Traceability for reported numbers and narrative claims.",
            "Role-based review before publishing externally facing outputs.",
            "Clear distinction between measured values, estimates, and AI-generated suggestions.",
        ],
        "sprints": [
            {
                "id": "SPRINT-01",
                "name": "Foundation and Intake",
                "goal": "Create the project shell, data model, and a usable evidence intake flow.",
                "deliverables": [
                    "Project scaffold with app shell and persistence layer.",
                    "Metric intake workflow for emissions, energy, and supplier evidence.",
                    "Audit log entries for create/update actions.",
                ],
                "acceptance_tests": [
                    "A user can create a metric entry with evidence and see it in a review queue.",
                    "Every record change stores actor, timestamp, and rationale metadata.",
                    "The UI explains which data is measured versus estimated.",
                ],
                "dependencies": [],
                "ai_opportunities": [
                    "Suggest likely missing evidence fields from uploaded records.",
                ],
            },
            {
                "id": "SPRINT-02",
                "name": "AI Narrative and Review",
                "goal": "Generate draft ESG commentary with reviewer gating and provenance.",
                "deliverables": [
                    "Narrative drafting workspace tied to source metrics.",
                    "Reviewer workflow with approve/reject states.",
                    "Confidence and citation display for each AI-assisted paragraph.",
                ],
                "acceptance_tests": [
                    "A reviewer can request changes on an AI draft without losing prior context.",
                    "Generated narrative links back to the supporting metrics and evidence.",
                    "The interface labels AI-generated text clearly before approval.",
                ],
                "dependencies": ["SPRINT-01"],
                "ai_opportunities": [
                    "Auto-summarize changes between reporting periods.",
                ],
            },
            {
                "id": "SPRINT-03",
                "name": "Action Tracking and Executive View",
                "goal": "Turn findings into owned actions with a concise leadership view.",
                "deliverables": [
                    "Remediation task board linked to metrics and review findings.",
                    "Executive summary page with confidence, risk, and progress.",
                    "Weekly digest artifact for stakeholder updates.",
                ],
                "acceptance_tests": [
                    "An issue found in review can be converted into an assigned action.",
                    "Executives can see progress, blockers, and confidence without opening raw records.",
                    "The summary distinguishes completed work, open risks, and AI suggestions.",
                ],
                "dependencies": ["SPRINT-02"],
                "ai_opportunities": [
                    "Recommend next-best actions based on recurring data quality issues.",
                ],
            },
        ],
        "_dry_run_note": f"Derived from brief: {brief}",
    }


def _generator_contract_payload(prompt: str) -> dict[str, Any]:
    sprint_id, sprint_name = _sprint_meta(prompt)
    return {
        "sprint_id": sprint_id,
        "objective": f"Deliver {sprint_name} with a tight, testable scope and visible trust cues.",
        "scope_in": [
            "Implement the highest-value user flow for this sprint end to end.",
            "Create only the minimum schema and UI states needed for the acceptance tests.",
            "Add explicit measured/estimated or human/AI labeling where relevant.",
        ],
        "scope_out": [
            "Nice-to-have visual polish that does not support the sprint goal.",
            "Future sprint workflows and cross-sprint speculative integrations.",
        ],
        "implementation_notes": [
            "Prefer boring primitives over complex abstractions in the first pass.",
            "Keep auditability visible in both API design and frontend language.",
            "Write a handoff note that a fresh agent could use after a context reset.",
        ],
        "verification_steps": [
            "Run the app and walk the primary flow manually.",
            "Verify acceptance tests from the sprint plan one by one.",
            "Capture any assumptions or shortcuts in the handoff note.",
        ],
        "risks": [
            "Scope drift into future reporting features.",
            "Confusing AI assistance with authoritative published content.",
        ],
    }


def _evaluator_contract_payload(prompt: str) -> dict[str, Any]:
    proposal = prompt.lower()
    required_changes: list[str] = []
    if "acceptance test" not in proposal:
        required_changes.append("Spell out explicit acceptance tests in verification_steps.")
    if "audit" not in proposal:
        required_changes.append("Add at least one auditability checkpoint to the contract.")
    status = "approved" if not required_changes else "needs_changes"
    return {
        "status": status,
        "feedback": (
            "The contract is acceptable for implementation."
            if status == "approved"
            else "The contract is close, but it still needs more concrete verification."
        ),
        "required_changes": required_changes,
        "approved_criteria": [
            "Scope is small enough for one sprint.",
            "Verification is observable rather than aspirational.",
            "Trust and provenance are represented in the user experience.",
        ],
    }


def _generator_sprint_payload(prompt: str) -> dict[str, Any]:
    sprint_id, sprint_name = _sprint_meta(prompt)
    return {
        "sprint_id": sprint_id,
        "summary": (
            f"Implement {sprint_name} as a thin vertical slice, then self-check against the contract before handoff."
        ),
        "files_to_touch": [
            "app shell",
            "data model or schema definitions",
            "primary API endpoint",
            "primary workflow screen",
            "tests or verification notes",
        ],
        "commands_to_run": [
            "run unit tests for the touched domain",
            "start the app locally and click through the happy path",
            "record any known gaps before QA review",
        ],
        "self_checks": [
            "All sprint acceptance tests have a matching UI or API path.",
            "Every user-facing metric shows provenance or confidence where appropriate.",
            "Known limitations are documented in the handoff notes.",
        ],
        "handoff_notes": [
            "Summarize what changed, what still feels risky, and what QA should probe first.",
            "List any seeded data or environment assumptions required for evaluation.",
        ],
    }


def _evaluator_sprint_payload(prompt: str) -> dict[str, Any]:
    lower = prompt.lower()
    stronger = "audit" in lower and "acceptance" in lower
    base_score = 8 if stronger else 7
    return {
        "status": "pass" if stronger else "needs_rework",
        "summary": (
            "The sprint clears the quality bar for the next handoff."
            if stronger
            else "The sprint has value, but QA still sees gaps in verification and trust cues."
        ),
        "strengths": [
            "The workflow stays anchored to a specific sprint objective.",
            "Trust, review, and provenance are treated as product requirements.",
        ],
        "blocking_issues": [] if stronger else ["Acceptance coverage is not explicit enough for handoff."],
        "recommendations": [
            "Keep the next sprint contract narrow.",
            "Preserve reviewer-visible provenance in every new feature.",
        ],
        "scores": {
            "product_depth": {"score": base_score, "reasoning": "The flow solves a real ESG workflow."},
            "functionality": {"score": base_score, "reasoning": "The intended task flow is testable."},
            "ux_clarity": {"score": base_score - 1, "reasoning": "The system explains what is happening."},
            "auditability": {"score": base_score + 1, "reasoning": "Evidence and trust markers are visible."},
            "code_quality": {"score": base_score, "reasoning": "Implementation plan suggests maintainable scope."},
        },
    }
