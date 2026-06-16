#!/usr/bin/env bash
# 一键：克隆 live-panel → 同步 ai-agency → 提交推送
set -euo pipefail

AA_SRC="/Users/hh101/Desktop/2025HTML/Cursor/888-PromptX/-Deepduct--/21-NPC/ai-agency"
LIVE_PANEL="${LIVE_PANEL_ROOT:-$HOME/live-panel}"

if [ ! -d "$AA_SRC" ]; then
  echo "找不到 ai-agency 源码: $AA_SRC"
  exit 1
fi

if [ ! -d "$LIVE_PANEL/.git" ]; then
  echo "克隆 live-panel → $LIVE_PANEL"
  git clone https://github.com/qq8147830/live-panel.git "$LIVE_PANEL"
elif [ ! -f "$LIVE_PANEL/vercel.json" ]; then
  echo "live-panel 不完整，重新克隆 → $LIVE_PANEL"
  rm -rf "$LIVE_PANEL"
  git clone https://github.com/qq8147830/live-panel.git "$LIVE_PANEL"
fi

bash "$AA_SRC/scripts/sync-to-live-panel.sh" "$LIVE_PANEL"

cd "$LIVE_PANEL"
git add ai-agency vercel.json
git status

if git diff --cached --quiet; then
  echo "没有可提交的变更。"
  exit 0
fi

git commit -m "fix: sync ai-agency with embedded registry for Vercel"
git push origin main

echo ""
echo "推送完成。等待 Vercel 自动部署后访问："
echo "  https://live-panel-virid.vercel.app/ai-agency/api/health"
