from __future__ import annotations

import json
import re
from dataclasses import asdict
from datetime import datetime
from pathlib import Path
from typing import Any

from esg_harness.llm import LLMClient
from esg_harness.models import (
    BuildPacket,
    ContractProposal,
    ContractReview,
    EvaluationReport,
    HarnessConfig,
    ProductSpec,
    SprintPlan,
)
from esg_harness.prompts import render_prompt


class HarnessOrchestrator:
    def __init__(self, config: HarnessConfig, client: LLMClient) -> None:
        self.config = config
        self.client = client

    def run(self, brief: str) -> Path:
        run_dir = self._make_run_dir(brief)
        self._write_text(run_dir / "brief.md", brief)

        spec = self._plan_spec(run_dir, brief)
        scoreboard: list[dict[str, Any]] = []

        for sprint in spec.sprints:
            sprint_dir = run_dir / "sprints" / sprint.id.lower()
            sprint_dir.mkdir(parents=True, exist_ok=True)

            contract = self._negotiate_contract(run_dir, sprint_dir, spec, sprint)
            evaluation = self._run_sprint(run_dir, sprint_dir, spec, sprint, contract)
            scoreboard.append(
                {
                    "sprint_id": sprint.id,
                    "sprint_name": sprint.name,
                    "status": evaluation.status,
                    "scores": {
                        metric: detail.score for metric, detail in evaluation.scores.items()
                    },
                }
            )

        self._write_json(run_dir / "scoreboard.json", {"scoreboard": scoreboard})
        self._write_text(run_dir / "README.md", self._run_summary(spec, scoreboard))
        return run_dir

    def _plan_spec(self, run_dir: Path, brief: str) -> ProductSpec:
        prompt = render_prompt(
            "planner.md",
            workspace=str(self.config.workspace),
            brief=brief.strip(),
        )
        raw = self.client.complete("planner", prompt)
        payload = _extract_json(raw)
        spec = ProductSpec.from_dict(payload)
        self._write_json(run_dir / "spec.json", spec.to_dict())
        self._write_text(run_dir / "spec.md", _render_spec_markdown(spec))
        return spec

    def _negotiate_contract(
        self,
        run_dir: Path,
        sprint_dir: Path,
        spec: ProductSpec,
        sprint: SprintPlan,
    ) -> ContractProposal:
        previous_feedback = ""
        final_contract: ContractProposal | None = None

        for round_index in range(1, self.config.max_contract_rounds + 1):
            proposal_prompt = render_prompt(
                "generator_contract.md",
                workspace=str(self.config.workspace),
                spec_json=json.dumps(spec.to_dict(), indent=2),
                sprint_id=sprint.id,
                sprint_name=sprint.name,
                sprint_json=json.dumps(asdict(sprint), indent=2),
                previous_feedback=previous_feedback or "None",
            )
            proposal_raw = self.client.complete("generator_contract", proposal_prompt)
            proposal = ContractProposal.from_dict(_extract_json(proposal_raw))
            self._write_json(
                sprint_dir / f"contract-proposal-r{round_index:02d}.json",
                proposal.to_dict(),
            )

            review_prompt = render_prompt(
                "evaluator_contract.md",
                workspace=str(self.config.workspace),
                spec_json=json.dumps(spec.to_dict(), indent=2),
                sprint_id=sprint.id,
                sprint_name=sprint.name,
                proposal_json=json.dumps(proposal.to_dict(), indent=2),
            )
            review_raw = self.client.complete("evaluator_contract", review_prompt)
            review = ContractReview.from_dict(_extract_json(review_raw))
            self._write_json(
                sprint_dir / f"contract-review-r{round_index:02d}.json",
                review.to_dict(),
            )

            final_contract = proposal
            if review.status.lower() == "approved":
                break
            previous_feedback = review.feedback + "\n" + "\n".join(review.required_changes)

        if final_contract is None:
            raise RuntimeError(f"Unable to negotiate contract for {sprint.id}.")

        self._write_json(sprint_dir / "contract.json", final_contract.to_dict())
        self._write_text(
            sprint_dir / "contract.md",
            _render_contract_markdown(final_contract, sprint, previous_feedback),
        )
        return final_contract

    def _run_sprint(
        self,
        run_dir: Path,
        sprint_dir: Path,
        spec: ProductSpec,
        sprint: SprintPlan,
        contract: ContractProposal,
    ) -> EvaluationReport:
        previous_eval = ""
        final_evaluation: EvaluationReport | None = None

        for attempt in range(1, self.config.max_eval_retries + 2):
            generator_prompt = render_prompt(
                "generator_sprint.md",
                workspace=str(self.config.workspace),
                run_dir=str(run_dir),
                sprint_id=sprint.id,
                sprint_name=sprint.name,
                spec_json=json.dumps(spec.to_dict(), indent=2),
                contract_json=json.dumps(contract.to_dict(), indent=2),
                previous_eval=previous_eval or "None",
            )
            build_raw = self.client.complete("generator_sprint", generator_prompt)
            build_packet = BuildPacket.from_dict(_extract_json(build_raw))
            self._write_json(
                sprint_dir / f"build-packet-a{attempt:02d}.json",
                build_packet.to_dict(),
            )
            self._write_text(
                sprint_dir / f"handoff-a{attempt:02d}.md",
                _render_handoff_markdown(sprint, contract, build_packet, previous_eval),
            )

            evaluator_prompt = render_prompt(
                "evaluator_sprint.md",
                workspace=str(self.config.workspace),
                thresholds_json=json.dumps(self.config.thresholds, indent=2),
                sprint_id=sprint.id,
                sprint_name=sprint.name,
                contract_json=json.dumps(contract.to_dict(), indent=2),
                build_packet_json=json.dumps(build_packet.to_dict(), indent=2),
            )
            evaluation_raw = self.client.complete("evaluator_sprint", evaluator_prompt)
            evaluation = EvaluationReport.from_dict(_extract_json(evaluation_raw))
            self._write_json(
                sprint_dir / f"evaluation-a{attempt:02d}.json",
                evaluation.to_dict(),
            )

            final_evaluation = evaluation
            if self._passes_thresholds(evaluation):
                break
            previous_eval = evaluation.summary + "\n" + "\n".join(evaluation.blocking_issues)

        if final_evaluation is None:
            raise RuntimeError(f"Unable to evaluate sprint {sprint.id}.")

        self._write_text(
            sprint_dir / "evaluation.md",
            _render_evaluation_markdown(final_evaluation, self.config.thresholds),
        )
        return final_evaluation

    def _passes_thresholds(self, evaluation: EvaluationReport) -> bool:
        if evaluation.status.lower() not in {"pass", "approved"}:
            return False
        for metric, threshold in self.config.thresholds.items():
            detail = evaluation.scores.get(metric)
            if detail is None or detail.score < threshold:
                return False
        return True

    def _make_run_dir(self, brief: str) -> Path:
        timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
        slug = _slugify(brief.splitlines()[0][:48] or "esg-harness")
        run_dir = self.config.output_dir / f"{timestamp}-{slug}"
        run_dir.mkdir(parents=True, exist_ok=True)
        return run_dir

    def _write_text(self, path: Path, content: str) -> None:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content.rstrip() + "\n", encoding="utf-8")

    def _write_json(self, path: Path, payload: dict[str, Any]) -> None:
        self._write_text(path, json.dumps(payload, indent=2))

    def _run_summary(self, spec: ProductSpec, scoreboard: list[dict[str, Any]]) -> str:
        lines = [
            f"# {spec.product_name}",
            "",
            spec.summary,
            "",
            "## Scoreboard",
            "",
        ]
        for row in scoreboard:
            lines.append(
                f"- {row['sprint_id']} {row['sprint_name']}: {row['status']} {json.dumps(row['scores'])}"
            )
        return "\n".join(lines)


def _slugify(text: str) -> str:
    lowered = text.strip().lower()
    lowered = re.sub(r"[^a-z0-9]+", "-", lowered)
    return lowered.strip("-") or "esg-harness"


def _extract_json(raw: str) -> dict[str, Any]:
    text = raw.strip()
    fence_match = re.search(r"```json\s*(\{.*\}|\[.*\])\s*```", text, re.DOTALL)
    if fence_match:
        return json.loads(fence_match.group(1))

    try:
        parsed = json.loads(text)
    except json.JSONDecodeError:
        start = min(
            [index for index in (text.find("{"), text.find("[")) if index != -1],
            default=-1,
        )
        end = max(text.rfind("}"), text.rfind("]"))
        if start == -1 or end == -1:
            raise ValueError("Model response did not contain JSON.") from None
        parsed = json.loads(text[start : end + 1])

    if not isinstance(parsed, dict):
        raise ValueError("Expected top-level JSON object.")
    return parsed


def _render_spec_markdown(spec: ProductSpec) -> str:
    lines = [
        f"# {spec.product_name}",
        "",
        spec.summary,
        "",
        "## North Star",
        "",
        spec.north_star,
        "",
        "## Personas",
        "",
    ]
    lines.extend(f"- {item}" for item in spec.user_personas)
    lines.extend(["", "## Design Language", ""])
    lines.extend(f"- {item}" for item in spec.design_language)
    lines.extend(["", "## Architecture", ""])
    lines.extend(f"- {item}" for item in spec.architecture)
    lines.extend(["", "## Sprints", ""])
    for sprint in spec.sprints:
        lines.append(f"### {sprint.id} {sprint.name}")
        lines.append("")
        lines.append(sprint.goal)
        lines.append("")
        lines.append("Deliverables:")
        lines.extend(f"- {item}" for item in sprint.deliverables)
        lines.append("")
        lines.append("Acceptance tests:")
        lines.extend(f"- {item}" for item in sprint.acceptance_tests)
        lines.append("")
    return "\n".join(lines)


def _render_contract_markdown(
    proposal: ContractProposal,
    sprint: SprintPlan,
    previous_feedback: str,
) -> str:
    lines = [
        f"# Contract for {sprint.id} {sprint.name}",
        "",
        proposal.objective,
        "",
        "## Scope In",
        "",
    ]
    lines.extend(f"- {item}" for item in proposal.scope_in)
    lines.extend(["", "## Scope Out", ""])
    lines.extend(f"- {item}" for item in proposal.scope_out)
    lines.extend(["", "## Verification", ""])
    lines.extend(f"- {item}" for item in proposal.verification_steps)
    lines.extend(["", "## Risks", ""])
    lines.extend(f"- {item}" for item in proposal.risks)
    lines.extend(["", "## Prior Evaluator Feedback", "", previous_feedback or "None"])
    return "\n".join(lines)


def _render_handoff_markdown(
    sprint: SprintPlan,
    contract: ContractProposal,
    build_packet: BuildPacket,
    previous_eval: str,
) -> str:
    lines = [
        f"# Handoff for {sprint.id} {sprint.name}",
        "",
        build_packet.summary,
        "",
        "## Contract Objective",
        "",
        contract.objective,
        "",
        "## Files to Touch",
        "",
    ]
    lines.extend(f"- {item}" for item in build_packet.files_to_touch)
    lines.extend(["", "## Commands to Run", ""])
    lines.extend(f"- {item}" for item in build_packet.commands_to_run)
    lines.extend(["", "## Self Checks", ""])
    lines.extend(f"- {item}" for item in build_packet.self_checks)
    lines.extend(["", "## Notes for a Fresh Agent", ""])
    lines.extend(f"- {item}" for item in build_packet.handoff_notes)
    lines.extend(["", "## Prior QA Feedback", "", previous_eval or "None"])
    return "\n".join(lines)


def _render_evaluation_markdown(
    evaluation: EvaluationReport,
    thresholds: dict[str, int],
) -> str:
    lines = [
        f"# Evaluation: {evaluation.status}",
        "",
        evaluation.summary,
        "",
        "## Scores",
        "",
    ]
    for metric, detail in evaluation.scores.items():
        target = thresholds.get(metric, 0)
        lines.append(f"- {metric}: {detail.score}/{target} - {detail.reasoning}")
    lines.extend(["", "## Blocking Issues", ""])
    lines.extend(f"- {item}" for item in evaluation.blocking_issues or ["None"])
    lines.extend(["", "## Recommendations", ""])
    lines.extend(f"- {item}" for item in evaluation.recommendations)
    return "\n".join(lines)
