#!/usr/bin/env bash
# 从 live-panel 主仓库提交并推送 ai-agency 变更（GitHub / Vercel）
set -euo pipefail

LIVE_PANEL="$(cd "$(dirname "$0")/../.." && pwd)"

if [ ! -d "$LIVE_PANEL/.git" ]; then
  echo "错误: 未找到 live-panel Git 仓库: $LIVE_PANEL"
  exit 1
fi

cd "$LIVE_PANEL"
git add ai-agency vercel.json
git status

if git diff --cached --quiet; then
  echo "没有可提交的变更。"
  exit 0
fi

MSG="${1:-chore: update ai-agency}"
git commit -m "$MSG"
git push origin main

echo ""
echo "已推送到 GitHub，Vercel 将自动部署。"
echo "验证: https://live-panel-virid.vercel.app/api/ai-agency/health"
