from __future__ import annotations

from pathlib import Path


class _SafeDict(dict[str, str]):
    def __missing__(self, key: str) -> str:
        return "{" + key + "}"


def prompts_dir() -> Path:
    return Path(__file__).resolve().parents[2] / "prompts"


def load_prompt(name: str) -> str:
    return (prompts_dir() / name).read_text(encoding="utf-8")


def render_prompt(name: str, **values: str) -> str:
    template = load_prompt(name)
    return template.format_map(_SafeDict(**values))
