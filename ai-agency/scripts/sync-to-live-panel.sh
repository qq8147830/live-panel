#!/usr/bin/env bash
# 将本目录 ai-agency 同步到 live-panel  monorepo 并准备推送
set -euo pipefail

SRC="$(cd "$(dirname "$0")/.." && pwd)"
LIVE_PANEL_ROOT="${1:-}"

if [ -z "$LIVE_PANEL_ROOT" ]; then
  echo "用法: bash scripts/sync-to-live-panel.sh /path/to/live-panel"
  echo ""
  echo "示例:"
  echo "  git clone https://github.com/qq8147830/live-panel.git ~/live-panel"
  echo "  bash scripts/sync-to-live-panel.sh ~/live-panel"
  exit 1
fi

if [ ! -d "$LIVE_PANEL_ROOT/.git" ]; then
  echo "错误: $LIVE_PANEL_ROOT 不是 live-panel 仓库根目录（缺少 .git）"
  exit 1
fi

DEST="$LIVE_PANEL_ROOT/ai-agency"
mkdir -p "$DEST"

echo "同步 ai-agency → $DEST"
rsync -a --delete \
  --exclude '.git' \
  --exclude 'venv' \
  --exclude '.env' \
  --exclude '.DS_Store' \
  --exclude '__pycache__' \
  --exclude 'data/agency-agents' \
  "$SRC/" "$DEST/"

# 确保内嵌 registry 存在
if ! python3 -c "import json; p=json.load(open('$DEST/registry/registry.json')); assert p.get('embedded_prompts') and p.get('expert_count',0)>0" 2>/dev/null; then
  echo "构建内嵌 registry..."
  (cd "$SRC" && python3 scripts/build_registry.py --embed-prompts)
  rsync -a "$SRC/registry/registry.json" "$DEST/registry/registry.json"
fi

# 修补 live-panel 根 vercel.json：打包 ai-agency 到 Python Serverless
VERCEL_JSON="$LIVE_PANEL_ROOT/vercel.json"
if [ ! -f "$VERCEL_JSON" ]; then
  echo "警告: 未找到 $VERCEL_JSON，跳过 vercel.json 修补。"
  echo "请确保 live-panel 为完整克隆: git clone https://github.com/qq8147830/live-panel.git"
else
  python3 - "$VERCEL_JSON" <<'PY'
import json
import sys
from pathlib import Path

path = Path(sys.argv[1])
data = json.loads(path.read_text(encoding="utf-8"))
funcs = data.setdefault("functions", {})
entry = funcs.setdefault("api/ai-agency/[...path].py", {})
entry["maxDuration"] = max(int(entry.get("maxDuration", 60)), 60)
entry["includeFiles"] = "ai-agency/{registry/**,data/locale_zh.json,src/**,app/**,static/**}"
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("patched:", path)
PY
fi

echo ""
echo "完成。请在 live-panel 根目录执行:"
echo "  cd $LIVE_PANEL_ROOT"
echo "  git status"
echo "  git add ai-agency vercel.json"
echo "  git commit -m 'fix: sync ai-agency with embedded registry for Vercel'"
echo "  git push origin main"
