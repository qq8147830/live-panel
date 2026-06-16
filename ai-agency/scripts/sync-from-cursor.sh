#!/usr/bin/env bash
# 可选：从 Cursor 开发副本同步到本目录（GitHub 主仓库用）
set -euo pipefail

CURSOR_SRC="${CURSOR_AA_SRC:-/Users/hh101/Desktop/2025HTML/Cursor/888-PromptX/-Deepduct--/21-NPC/ai-agency}"
DEST="$(cd "$(dirname "$0")/.." && pwd)"

if [ ! -d "$CURSOR_SRC" ]; then
  echo "找不到 Cursor 副本: $CURSOR_SRC"
  exit 1
fi

echo "同步 $CURSOR_SRC → $DEST"
rsync -a --delete \
  --exclude 'venv' --exclude '.env' --exclude '.git' --exclude '__pycache__' \
  --exclude '.DS_Store' --exclude 'data/agency-agents' \
  "$CURSOR_SRC/" "$DEST/"

echo "完成。本地开发请在本目录执行: bash run_dev.sh"
echo "推送 GitHub: bash scripts/push-github.sh"
