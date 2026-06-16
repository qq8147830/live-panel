from __future__ import annotations

import json
import sys
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from paths import STATIC_DIR  # noqa: E402
from service import get_service  # noqa: E402


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=8000)
    expert_id: str = ""
    thinking_mode: str = "fast"


class MicroRequest(BaseModel):
    incident: str = Field(min_length=1, max_length=8000)
    thinking_mode: str = "fast"


def create_app() -> FastAPI:
    app = FastAPI(
        title="AI Agency",
        description="Agency-agents expert team with NEXUS-Micro orchestration",
        version="0.2.0",
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    if STATIC_DIR.exists():
        app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

    @app.get("/")
    async def index() -> FileResponse:
        index_file = STATIC_DIR / "index.html"
        if not index_file.exists():
            raise HTTPException(status_code=404, detail="UI not found")
        return FileResponse(index_file)

    @app.get("/api/health")
    async def health() -> dict:
        return get_service().health()

    @app.get("/api/experts")
    async def experts(division: str = "", query: str = "", limit: int = 50) -> dict:
        items = get_service().list_experts(division=division, query=query, limit=limit)
        return {"count": len(items), "experts": items}

    @app.get("/api/micro/pipeline")
    async def micro_pipeline() -> dict:
        steps = get_service().micro_pipeline_info()
        return {"count": len(steps), "steps": steps}

    @app.post("/api/chat")
    async def chat(payload: ChatRequest) -> dict:
        try:
            return get_service().chat(
                payload.message,
                expert_id=payload.expert_id,
                thinking_mode=payload.thinking_mode,
            )
        except RuntimeError as exc:
            raise HTTPException(status_code=500, detail=str(exc)) from exc
        except ValueError as exc:
            raise HTTPException(status_code=404, detail=str(exc)) from exc
        except FileNotFoundError as exc:
            raise HTTPException(status_code=500, detail=str(exc)) from exc

    @app.post("/api/chat/stream")
    async def chat_stream(payload: ChatRequest) -> StreamingResponse:
        def event_stream():
            try:
                for event in get_service().chat_stream_events(
                    payload.message,
                    expert_id=payload.expert_id,
                    thinking_mode=payload.thinking_mode,
                ):
                    yield f"data: {json.dumps(event, ensure_ascii=False)}\n\n"
            except Exception as exc:  # noqa: BLE001
                yield f"data: {json.dumps({'type': 'error', 'detail': str(exc)}, ensure_ascii=False)}\n\n"

        return StreamingResponse(event_stream(), media_type="text/event-stream")

    @app.post("/api/micro")
    async def micro(payload: MicroRequest) -> dict:
        try:
            return get_service().run_micro(
                payload.incident,
                thinking_mode=payload.thinking_mode,
            )
        except RuntimeError as exc:
            raise HTTPException(status_code=500, detail=str(exc)) from exc
        except FileNotFoundError as exc:
            raise HTTPException(status_code=500, detail=str(exc)) from exc

    return app


app = create_app()
