#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="$ROOT/data/agency-agents"
SOURCE="$ROOT/../agency-agents/agency-agents"

mkdir -p "$ROOT/data"

if [ -d "$TARGET" ] || [ -L "$TARGET" ]; then
  echo "data/agency-agents already exists"
else
  if [ -d "$SOURCE" ]; then
    ln -sfn "$SOURCE" "$TARGET"
    echo "linked: $TARGET -> $SOURCE"
  else
    echo "Source not found: $SOURCE"
    echo "Please clone agency-agents into data/agency-agents manually."
    exit 1
  fi
fi

cd "$ROOT"
if [ ! -d "venv" ]; then
  python3 -m venv venv
fi
source venv/bin/activate
pip install -q -r requirements.txt
python scripts/build_registry.py
echo "setup complete"
