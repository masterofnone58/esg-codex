from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any


@dataclass
class SprintPlan:
    id: str
    name: str
    goal: str
    deliverables: list[str]
    acceptance_tests: list[str]
    dependencies: list[str] = field(default_factory=list)
    ai_opportunities: list[str] = field(default_factory=list)

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "SprintPlan":
        return cls(
            id=str(data["id"]),
            name=str(data["name"]),
            goal=str(data["goal"]),
            deliverables=[str(item) for item in data.get("deliverables", [])],
            acceptance_tests=[str(item) for item in data.get("acceptance_tests", [])],
            dependencies=[str(item) for item in data.get("dependencies", [])],
            ai_opportunities=[str(item) for item in data.get("ai_opportunities", [])],
        )


@dataclass
class ProductSpec:
    product_name: str
    summary: str
    north_star: str
    user_personas: list[str]
    design_language: list[str]
    architecture: list[str]
    data_sources: list[str]
    compliance_considerations: list[str]
    sprints: list[SprintPlan]

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "ProductSpec":
        return cls(
            product_name=str(data["product_name"]),
            summary=str(data["summary"]),
            north_star=str(data["north_star"]),
            user_personas=[str(item) for item in data.get("user_personas", [])],
            design_language=[str(item) for item in data.get("design_language", [])],
            architecture=[str(item) for item in data.get("architecture", [])],
            data_sources=[str(item) for item in data.get("data_sources", [])],
            compliance_considerations=[
                str(item) for item in data.get("compliance_considerations", [])
            ],
            sprints=[SprintPlan.from_dict(item) for item in data.get("sprints", [])],
        )

    def to_dict(self) -> dict[str, Any]:
        return {
            "product_name": self.product_name,
            "summary": self.summary,
            "north_star": self.north_star,
            "user_personas": self.user_personas,
            "design_language": self.design_language,
            "architecture": self.architecture,
            "data_sources": self.data_sources,
            "compliance_considerations": self.compliance_considerations,
            "sprints": [
                {
                    "id": sprint.id,
                    "name": sprint.name,
                    "goal": sprint.goal,
                    "deliverables": sprint.deliverables,
                    "acceptance_tests": sprint.acceptance_tests,
                    "dependencies": sprint.dependencies,
                    "ai_opportunities": sprint.ai_opportunities,
                }
                for sprint in self.sprints
            ],
        }


@dataclass
class ContractProposal:
    sprint_id: str
    objective: str
    scope_in: list[str]
    scope_out: list[str]
    implementation_notes: list[str]
    verification_steps: list[str]
    risks: list[str]

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "ContractProposal":
        return cls(
            sprint_id=str(data["sprint_id"]),
            objective=str(data["objective"]),
            scope_in=[str(item) for item in data.get("scope_in", [])],
            scope_out=[str(item) for item in data.get("scope_out", [])],
            implementation_notes=[str(item) for item in data.get("implementation_notes", [])],
            verification_steps=[str(item) for item in data.get("verification_steps", [])],
            risks=[str(item) for item in data.get("risks", [])],
        )

    def to_dict(self) -> dict[str, Any]:
        return {
            "sprint_id": self.sprint_id,
            "objective": self.objective,
            "scope_in": self.scope_in,
            "scope_out": self.scope_out,
            "implementation_notes": self.implementation_notes,
            "verification_steps": self.verification_steps,
            "risks": self.risks,
        }


@dataclass
class ContractReview:
    status: str
    feedback: str
    required_changes: list[str]
    approved_criteria: list[str]

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "ContractReview":
        return cls(
            status=str(data["status"]),
            feedback=str(data["feedback"]),
            required_changes=[str(item) for item in data.get("required_changes", [])],
            approved_criteria=[str(item) for item in data.get("approved_criteria", [])],
        )

    def to_dict(self) -> dict[str, Any]:
        return {
            "status": self.status,
            "feedback": self.feedback,
            "required_changes": self.required_changes,
            "approved_criteria": self.approved_criteria,
        }


@dataclass
class BuildPacket:
    sprint_id: str
    summary: str
    files_to_touch: list[str]
    commands_to_run: list[str]
    self_checks: list[str]
    handoff_notes: list[str]

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "BuildPacket":
        return cls(
            sprint_id=str(data["sprint_id"]),
            summary=str(data["summary"]),
            files_to_touch=[str(item) for item in data.get("files_to_touch", [])],
            commands_to_run=[str(item) for item in data.get("commands_to_run", [])],
            self_checks=[str(item) for item in data.get("self_checks", [])],
            handoff_notes=[str(item) for item in data.get("handoff_notes", [])],
        )

    def to_dict(self) -> dict[str, Any]:
        return {
            "sprint_id": self.sprint_id,
            "summary": self.summary,
            "files_to_touch": self.files_to_touch,
            "commands_to_run": self.commands_to_run,
            "self_checks": self.self_checks,
            "handoff_notes": self.handoff_notes,
        }


@dataclass
class ScoreDetail:
    score: int
    reasoning: str

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "ScoreDetail":
        return cls(score=int(data["score"]), reasoning=str(data["reasoning"]))

    def to_dict(self) -> dict[str, Any]:
        return {"score": self.score, "reasoning": self.reasoning}


@dataclass
class EvaluationReport:
    status: str
    summary: str
    strengths: list[str]
    blocking_issues: list[str]
    recommendations: list[str]
    scores: dict[str, ScoreDetail]

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "EvaluationReport":
        scores = {
            str(key): ScoreDetail.from_dict(value)
            for key, value in data.get("scores", {}).items()
        }
        return cls(
            status=str(data["status"]),
            summary=str(data["summary"]),
            strengths=[str(item) for item in data.get("strengths", [])],
            blocking_issues=[str(item) for item in data.get("blocking_issues", [])],
            recommendations=[str(item) for item in data.get("recommendations", [])],
            scores=scores,
        )

    def to_dict(self) -> dict[str, Any]:
        return {
            "status": self.status,
            "summary": self.summary,
            "strengths": self.strengths,
            "blocking_issues": self.blocking_issues,
            "recommendations": self.recommendations,
            "scores": {key: value.to_dict() for key, value in self.scores.items()},
        }


@dataclass
class BackendConfig:
    type: str = "dry-run"
    command: list[str] = field(default_factory=list)
    env: dict[str, str] = field(default_factory=dict)

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "BackendConfig":
        return cls(
            type=str(data.get("type", "dry-run")),
            command=[str(item) for item in data.get("command", [])],
            env={str(key): str(value) for key, value in data.get("env", {}).items()},
        )


@dataclass
class HarnessConfig:
    workspace: Path
    output_dir: Path
    max_contract_rounds: int = 3
    max_eval_retries: int = 2
    thresholds: dict[str, int] = field(
        default_factory=lambda: {
            "product_depth": 7,
            "functionality": 8,
            "ux_clarity": 7,
            "auditability": 8,
            "code_quality": 7,
        }
    )
    backend: BackendConfig = field(default_factory=BackendConfig)

    @classmethod
    def from_dict(cls, data: dict[str, Any], workspace: Path) -> "HarnessConfig":
        return cls(
            workspace=workspace,
            output_dir=workspace / str(data.get("output_dir", "runs")),
            max_contract_rounds=int(data.get("max_contract_rounds", 3)),
            max_eval_retries=int(data.get("max_eval_retries", 2)),
            thresholds={
                str(key): int(value)
                for key, value in data.get("thresholds", {}).items()
            }
            or cls(workspace=workspace, output_dir=workspace / "runs").thresholds,
            backend=BackendConfig.from_dict(data.get("backend", {})),
        )
