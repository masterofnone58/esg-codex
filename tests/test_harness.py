from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from esg_harness.llm import make_client
from esg_harness.models import HarnessConfig
from esg_harness.orchestrator import HarnessOrchestrator, _extract_json


class JsonExtractionTests(unittest.TestCase):
    def test_extracts_fenced_json(self) -> None:
        payload = _extract_json('```json\n{"status":"ok"}\n```')
        self.assertEqual(payload["status"], "ok")

    def test_extracts_json_embedded_in_text(self) -> None:
        payload = _extract_json('hello {"status":"ok","value":3} goodbye')
        self.assertEqual(payload["value"], 3)


class HarnessSmokeTests(unittest.TestCase):
    def test_dry_run_generates_artifacts(self) -> None:
        with tempfile.TemporaryDirectory() as tmpdir:
            workspace = Path(tmpdir)
            (workspace / "config").mkdir()
            config_payload = {
                "output_dir": "runs",
                "backend": {"type": "dry-run"},
            }
            config = HarnessConfig.from_dict(config_payload, workspace=workspace)
            client = make_client(config.backend)
            run_dir = HarnessOrchestrator(config=config, client=client).run(
                "Build an ESG workflow assistant for evidence collection."
            )

            self.assertTrue((run_dir / "spec.json").exists())
            self.assertTrue((run_dir / "README.md").exists())
            scoreboard = json.loads((run_dir / "scoreboard.json").read_text())
            self.assertEqual(len(scoreboard["scoreboard"]), 3)


if __name__ == "__main__":
    unittest.main()
