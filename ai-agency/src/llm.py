from __future__ import annotations

import os
from dataclasses import dataclass
from typing import Generator, Literal

from openai import OpenAI

ThinkingMode = Literal["fast", "deep"]

THINKING_PROFILES: dict[str, dict] = {
    "fast": {
        "temperature": 0.7,
        "timeout": 60.0,
        "estimate_seconds": (8, 15),
    },
    "deep": {
        "temperature": 0.3,
        "timeout": 180.0,
        "estimate_seconds": (25, 60),
    },
}

DEEP_SYSTEM_SUFFIX = """

## Deep Thinking Mode
请先进行逐步推理，再给出最终答案。回答结构建议包含：
1. 问题理解
2. 关键考量点
3. 可执行建议或方案
要求专业、严谨、可落地。
"""


@dataclass
class LLMConfig:
    api_key: str
    base_url: str | None
    model: str
    temperature: float = 0.7

    @classmethod
    def from_env(cls) -> LLMConfig:
        api_key = os.getenv("OPENAI_API_KEY", "")
        if not api_key:
            raise RuntimeError(
                "OPENAI_API_KEY is not set. Export it before running ai-agency."
            )
        return cls(
            api_key=api_key,
            base_url=os.getenv("OPENAI_BASE_URL") or None,
            model=os.getenv("MODEL_NAME", "gpt-4o-mini"),
            temperature=float(os.getenv("LLM_TEMPERATURE", "0.7")),
        )


def normalize_thinking_mode(mode: str | None) -> ThinkingMode:
    return "deep" if mode == "deep" else "fast"


def estimate_seconds(thinking_mode: ThinkingMode, *, micro_steps: int = 1) -> tuple[int, int]:
    low, high = THINKING_PROFILES[thinking_mode]["estimate_seconds"]
    return low * micro_steps, high * micro_steps


class LLMClient:
    def __init__(self, config: LLMConfig):
        client_kwargs: dict = {"api_key": config.api_key}
        if config.base_url:
            client_kwargs["base_url"] = config.base_url
        self._client = OpenAI(**client_kwargs)
        self._config = config

    def _prepare(
        self, system_prompt: str, thinking_mode: ThinkingMode
    ) -> tuple[str, float, float]:
        profile = THINKING_PROFILES[thinking_mode]
        prompt = system_prompt
        if thinking_mode == "deep":
            prompt += DEEP_SYSTEM_SUFFIX
        return prompt, profile["temperature"], profile["timeout"]

    def chat(
        self,
        system_prompt: str,
        user_prompt: str,
        thinking_mode: ThinkingMode = "fast",
    ) -> str:
        system, temperature, timeout = self._prepare(system_prompt, thinking_mode)
        response = self._client.chat.completions.create(
            model=self._config.model,
            temperature=temperature,
            timeout=timeout,
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": user_prompt},
            ],
        )
        message = response.choices[0].message.content
        return message or ""

    def chat_stream(
        self,
        system_prompt: str,
        user_prompt: str,
        thinking_mode: ThinkingMode = "fast",
    ) -> Generator[str, None, None]:
        system, temperature, timeout = self._prepare(system_prompt, thinking_mode)
        stream = self._client.chat.completions.create(
            model=self._config.model,
            temperature=temperature,
            timeout=timeout,
            stream=True,
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": user_prompt},
            ],
        )
        for chunk in stream:
            delta = chunk.choices[0].delta.content if chunk.choices else None
            if delta:
                yield delta
