#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

if [ ! -d "venv" ]; then
  python3 -m venv venv
fi

source venv/bin/activate
pip install -q -r requirements.txt

if [ ! -f ".env" ] && [ -f ".env.example" ]; then
  cp .env.example .env
  echo "created .env from .env.example — please fill OPENAI_API_KEY"
fi

bash scripts/setup_data.sh

PORT="${PORT:-18888}"
echo "Starting AI Agency at http://127.0.0.1:${PORT}"
exec uvicorn app.main:app --host 127.0.0.1 --port "$PORT" --reload
