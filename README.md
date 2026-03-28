# ESG Long-Running Agent Harness

This repo is a fresh scaffold for a custom planner-generator-evaluator workflow modeled on Anthropic's blog post, ["Harness design for long-running application development"](https://www.anthropic.com/engineering/harness-design-long-running-apps), published March 24, 2026.

Instead of a generic coding harness, this version is customized for ESG and sustainability-product work:

- The planner turns a short product brief into an ESG-aware product spec.
- The generator works sprint by sprint and writes a concrete sprint contract before execution.
- The evaluator reviews that contract, then grades each sprint against hard thresholds.
- Every step writes files to disk so a fresh agent can resume cleanly after a long run or context reset.

## What This Implements

The article's main ideas are mapped into this scaffold directly:

- `Planner -> spec`: a 1-4 sentence brief becomes a richer product spec with personas, design language, architecture, data sources, compliance notes, and sprint slices.
- `Generator <-> Evaluator contract loop`: before a sprint starts, the generator proposes what "done" means and the evaluator either approves it or sends it back with concrete changes.
- `Generator -> handoff`: each sprint produces a build packet and a handoff artifact designed to survive compaction or context resets.
- `Evaluator -> scorecard`: the sprint is graded on product depth, functionality, UX clarity, auditability, and code quality with hard thresholds.
- `Files as protocol`: artifacts are stored under `runs/...` so the workflow is inspectable, resumable, and tool-agnostic.

## Included MVP Prototype

This repo now also includes a concrete ESG SaaS MVP prototype in [`app/`](/Users/ansonshen/Codex/esg-codex/app/index.html):

- responsive browser UI for desktop and mobile
- multi-tenant switching
- store-manager evidence capture with camera-friendly file input
- ESG-admin metrics, logistics logging, and draft report generation
- executive supply-chain drill-down with evidence and certificates

Open [`app/index.html`](/Users/ansonshen/Codex/esg-codex/app/index.html) directly in a browser, or serve the repo with a simple static file server.

When pushed to GitHub, the included workflow in [`deploy-pages.yml`](/Users/ansonshen/Codex/esg-codex/.github/workflows/deploy-pages.yml) deploys the static MVP from `app/` to GitHub Pages.

## Repo Layout

- `src/esg_harness/`: the CLI, orchestration logic, backend abstraction, and data models
- `prompts/`: role prompts for planner, generator, and evaluator
- `config/harness.example.json`: starter config
- `config/harness.command.example.json`: starter config for a real command-based agent
- `examples/esg-brief.md`: sample brief
- `tests/test_harness.py`: smoke tests for the dry-run workflow

## Running It

Install in editable mode if you want the `esg-harness` command:

```bash
python -m pip install -e .
```

Or run directly from the repo without installing:

```bash
PYTHONPATH=src python -m esg_harness --brief examples/esg-brief.md --config config/harness.example.json
```

Run the included dry-run workflow after install:

```bash
python -m esg_harness --brief examples/esg-brief.md --config config/harness.example.json
```

That command writes a full artifact trail to `runs/<timestamp>-<slug>/`, including:

- `spec.json` and `spec.md`
- `sprints/<id>/contract*.json`
- `sprints/<id>/build-packet*.json`
- `sprints/<id>/handoff*.md`
- `sprints/<id>/evaluation*.json`
- `scoreboard.json`

## Connecting a Real Agent

The harness is deliberately backend-agnostic. By default it uses a deterministic `dry-run` backend so the workflow is easy to inspect. To connect a real model or coding agent, switch the backend config to:

```json
{
  "backend": {
    "type": "command",
    "command": ["your-agent-cli", "run"],
    "env": {
      "YOUR_MODEL_NAME": "..."
    }
  }
}
```

Assumptions for the command backend:

- The command accepts the full prompt via stdin.
- The command prints a single JSON object to stdout.
- The command can be any tool you prefer, as long as it follows that contract.

## ESG-Specific Customization

The custom agent is opinionated in a few ways:

- It pushes the planner toward trust-heavy ESG workflows instead of generic dashboards.
- It adds auditability as a first-class evaluation criterion, not a side concern.
- It expects measured versus estimated values and human versus AI-generated content to be visible in the UX.
- It encourages AI features only where they improve evidence collection, narrative drafting, or next-step recommendations.

## Next Step

If you want, I can take this one step further and wire the command backend to a specific agent runtime you plan to use here, then add resume support so one sprint can hand off directly into the next without manual glue.
