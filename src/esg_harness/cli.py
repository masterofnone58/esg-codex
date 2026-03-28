from __future__ import annotations

import argparse
import json
from pathlib import Path

from esg_harness.llm import make_client
from esg_harness.models import HarnessConfig
from esg_harness.orchestrator import HarnessOrchestrator


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="esg-harness",
        description="Run an ESG planner-generator-evaluator workflow.",
    )
    parser.add_argument(
        "--brief",
        required=True,
        help="Path to a markdown or text brief with a 1-4 sentence product idea.",
    )
    parser.add_argument(
        "--config",
        default="config/harness.example.json",
        help="Path to the JSON config file.",
    )
    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()

    workspace = Path.cwd()
    config_path = workspace / args.config
    brief_path = workspace / args.brief

    config_payload = json.loads(config_path.read_text(encoding="utf-8"))
    config = HarnessConfig.from_dict(config_payload, workspace=workspace)
    client = make_client(config.backend)

    brief = brief_path.read_text(encoding="utf-8")
    run_dir = HarnessOrchestrator(config=config, client=client).run(brief)
    print(run_dir)
    return 0
