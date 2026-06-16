import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / "ai-agency"
for path in (ROOT, ROOT / "src"):
    value = str(path)
    if value not in sys.path:
        sys.path.insert(0, value)

from app.main import app as fastapi_app  # noqa: E402

PREFIX = "/api/ai-agency"


class StripPrefixMiddleware:
    def __init__(self, app, prefix: str = PREFIX):
        self.app = app
        self.prefix = prefix

    async def __call__(self, scope, receive, send):
        if scope.get("type") == "http":
            path = scope.get("path", "")
            if path.startswith(self.prefix):
                rest = path[len(self.prefix) :] or ""
                scope = dict(scope)
                scope["path"] = f"/api{rest}"
        await self.app(scope, receive, send)


app = StripPrefixMiddleware(fastapi_app)
