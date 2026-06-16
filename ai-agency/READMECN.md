# AI Agency 专家团

基于 [agency-agents](https://github.com/qq8147830/agency-agents) 的多智能体 Web 应用。将 169+ 专家角色封装为可对话系统，并支持 NEXUS-Micro 序贯协作流水线。

---

## 项目地址

**GitHub / Vercel 主目录：**

```text
/Users/hh101/Documents/GitHub/qq8147830/live-panel/ai-agency
```

**Cursor 编辑副本：**

```text
/Users/hh101/Desktop/2025HTML/Cursor/888-PromptX/-Deepduct--/21-NPC/ai-agency
```

**本地访问：** `http://127.0.0.1:18888`  
**Vercel 生产：** `https://live-panel-virid.vercel.app/ai-agency/`

---

## 你以后这样用

> **本目录是 GitHub / Vercel 主目录。** 在此开发、提交、推送；`live-panel` 仓库从这儿同步到 GitHub。

### 两个目录分别是什么

| 目录 | 角色 |
|------|------|
| `~/Documents/GitHub/.../live-panel/ai-agency` | **主目录**：Git 提交、推 GitHub、Vercel 部署 |
| `.../Cursor/.../ai-agency` | **编辑副本**：在 Cursor 里改代码，可同步到主目录 |

两份代码**不会自动同步**，需要时用脚本或手动 `rsync`。

### 日常开发（推荐在主目录）

```bash
cd /Users/hh101/Documents/GitHub/qq8147830/live-panel/ai-agency
bash run_dev.sh
```

浏览器打开 `http://127.0.0.1:18888`。

启动后请看终端输出：

```text
Serving from: /Users/hh101/Documents/GitHub/qq8147830/live-panel/ai-agency
```

出现上述路径，说明跑的是**主目录**；若路径不对，说明 18888 被另一个副本占用了，先 `Ctrl+C` 停掉再重启。

停止服务：在运行 `run_dev.sh` 的终端按 `Ctrl + C`。

### 推送到 GitHub / Vercel

```bash
cd /Users/hh101/Documents/GitHub/qq8147830/live-panel/ai-agency
bash scripts/push-github.sh "你的提交说明"
```

脚本会在 `live-panel` 仓库根目录执行 `git add ai-agency`、`git commit`、`git push origin main`，Vercel 会自动重新部署。

### 若先在 Cursor 副本改代码

```bash
cd /Users/hh101/Documents/GitHub/qq8147830/live-panel/ai-agency
bash scripts/sync-from-cursor.sh
bash scripts/push-github.sh "sync from cursor"
```

`sync-from-cursor.sh` 会把 Cursor 副本的改动覆盖同步到本目录（不含 `venv`、`.env`、软链接 `data/agency-agents`）。

### 避免踩坑

1. **只从一个目录启动 18888** — 以终端里 `Serving from:` 为准。
2. **Git 只在 live-panel 根仓库提交** — 不要指望 Cursor 副本里的独立 `.git` 推送到 GitHub。
3. **改完 UI 要硬刷新** — 浏览器 `Cmd + Shift + R`。
4. **Vercel 对话需环境变量** — 在 Vercel 项目设置中配置 `OPENAI_API_KEY`、`OPENAI_BASE_URL`、`MODEL_NAME`。

### 部署后验证

| 检查项 | URL |
|--------|-----|
| API 健康 | `https://live-panel-virid.vercel.app/api/ai-agency/health` |
| 页面 | `https://live-panel-virid.vercel.app/ai-agency/` |

`health` 应返回 `"experts": 169`。页面左侧应显示专家列表（单专家模式），NEXUS-Micro 模式侧栏只显示一句 P1 说明、不列专家名。

---

## 项目简介

### 这是什么？

AI Agency 是一个自研的多智能体运行时，不依赖 PromptX / PicoAgents / AG2。它把 `agency-agents` 仓库里的专家 Markdown 角色文件，转成可检索、可激活、可协作的 Agent 系统。

### 核心能力

| 能力                 | 说明                                                                   |
| -------------------- | ---------------------------------------------------------------------- |
| **专家注册表 (S0)**  | 扫描 `data/agency-agents/` 下专家 `.md`，生成 `registry/registry.json` |
| **单专家对话 (S1)**  | 选择专家或自动路由，调用 LLM 以专家身份回答                            |
| **NEXUS-Micro 编排** | 按事故响应 P1 流水线，4 位专家序贯协作并传递上下文                     |
| **Web UI**           | 浏览器聊天界面，支持专家搜索、领域筛选、双模式切换                     |
| **CLI**              | 命令行调试 `chat` / `micro` / `registry`                               |

### 技术栈

- Python 3.11
- FastAPI + Uvicorn
- OpenAI 兼容 API（支持硅基流动 SiliconFlow）
- 纯自研 `Agent` 基类，无第三方 Agent 框架

### 目录结构

```text
ai-agency/
├── api/index.py              # Vercel Serverless 入口
├── app/main.py               # FastAPI 应用
├── src/
│   ├── agent.py              # Agent 基类
│   ├── expert_registry.py    # 专家扫描与检索
│   ├── nexus_micro.py        # NEXUS-Micro 编排
│   ├── service.py            # 业务服务层
│   └── llm.py                # LLM 客户端
├── static/index.html         # Web 聊天界面
├── registry/registry.json    # 专家索引（构建生成）
├── data/agency-agents/       # 专家数据（软链接或子模块）
├── scripts/
│   ├── setup_data.sh         # 初始化专家数据
│   └── build_registry.py     # 构建注册表
├── run_dev.sh                # 本地一键启动
├── vercel.json               # Vercel 部署配置
├── .env.example              # 环境变量模板
└── READMECN.md               # 本文档
```

texttext---

## 快速开始

### 1. 环境要求

- macOS / Linux
- Python 3.11+
- 硅基流动或其他 OpenAI 兼容 API Key

### 2. 初始化

```bash
cd /Users/hh101/Desktop/2025HTML/Cursor/888-PromptX/-Deepduct--/21-NPC/ai-agency

# 一键：创建 venv、链接专家数据、构建 registry
bash scripts/setup_data.sh

# 配置环境变量
cp .env.example .env
# 编辑 .env，填入你的 API Key（见下文「硅基流动配置」）
```

bash

### 3. 启动服务

```bash
bash run_dev.sh
```

bashbash浏览器打开：

```
http://127.0.0.1:18888
```

text### 4. 手动启动（可选）

```bash
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 18888 --reload
```

bash

## 硅基流动 API 配置

本项目通过 **OpenAI 兼容接口** 调用硅基流动，只需配置 3 个环境变量。

### 本地 `.env` 配置

编辑项目根目录 `.env`：

```env
OPENAI_API_KEY=你的硅基流动_API_Key
OPENAI_BASE_URL=https://api.siliconflow.cn/v1
MODEL_NAME=Qwen/Qwen2.5-7B-Instruct
```

envenv### 获取 API Key

1. 打开 [硅基流动控制台](https://cloud.siliconflow.cn/)
2. 注册 / 登录
3. 进入「API 密钥」页面创建 Key
4. 复制 Key 填入 `OPENAI_API_KEY`

### 推荐模型（按需替换 `MODEL_NAME`）

| 模型                          | 说明                   |
| ----------------------------- | ---------------------- |
| `Qwen/Qwen2.5-7B-Instruct`    | 性价比高，适合开发调试 |
| `Qwen/Qwen2.5-72B-Instruct`   | 更强推理，适合复杂任务 |
| `deepseek-ai/DeepSeek-V3`     | 综合能力强             |
| `Pro/deepseek-ai/DeepSeek-R1` | 推理型任务             |

可在硅基流动模型广场查看完整列表，把模型名原样填入 `MODEL_NAME` 即可。

### Vercel 环境变量配置

部署到 Vercel 后，在项目的 **Settings → Environment Variables** 添加：

| 变量名            | 值                              |
| ----------------- | ------------------------------- |
| `OPENAI_API_KEY`  | 你的硅基流动 Key                |
| `OPENAI_BASE_URL` | `https://api.siliconflow.cn/v1` |
| `MODEL_NAME`      | 例如 `Qwen/Qwen2.5-7B-Instruct` |

保存后重新 Deploy 生效。

---

## 使用说明

### Web 界面

1. 打开 `http://127.0.0.1:18888`
2. **单专家模式**
   - 直接输入问题 → 系统自动路由专家
   - 或在左侧点选专家 → 指定专家回答
   - 可用搜索框和领域下拉筛选专家
3. **NEXUS-Micro 模式**
   - 切换到「NEXUS-Micro」
   - 输入事故描述，例如：`支付接口 50% 错误率，用户无法下单`
   - 系统将按 P1 流水线依次调用 4 位专家并展示每步输出

### CLI 命令

```bash
source venv/bin/activate

# 查看注册表
python main.py registry
python main.py registry --query "frontend react"

# 单专家对话
python main.py chat "帮我写一个 React 登录组件"
python main.py chat "优化 Core Web Vitals" --expert-id engineering-frontend-developer

# NEXUS-Micro 事故响应
python main.py micro --incident "支付接口 50% 错误率，用户无法下单"
```

bashbash### API 接口

| 方法 | 路径                                   | 说明               |
| ---- | -------------------------------------- | ------------------ |
| GET  | `/api/health`                          | 健康检查           |
| GET  | `/api/experts?query=&division=&limit=` | 专家列表           |
| POST | `/api/chat`                            | 单专家对话         |
| POST | `/api/micro`                           | NEXUS-Micro 流水线 |

`POST /api/chat` 请求体：

```json
{
  "message": "帮我设计登录页",
  "expert_id": ""
}
```

jsonjson `POST /api/micro` 请求体：

```json
{
  "incident": "支付接口 50% 错误率，用户无法下单"
}
```

jsonjson---

## 发布到 GitHub

### 1. 准备独立仓库

建议在 `ai-agency` 目录初始化 Git 仓库：

```bash
cd 888-PromptX/-Deepduct--/21-NPC/ai-agency
git init
git add .
git commit -m "feat: AI Agency web app with NEXUS-Micro orchestration"
```

bashbash### 2. 专家数据如何处理

`data/agency-agents` 默认软链接到上级目录。发布 GitHub 时有两种方式：

**方式 A（推荐）：Git Submodule**

```bash
git submodule add https://github.com/qq8147830/agency-agents.git data/agency-agents
bash scripts/build_registry.py
git add registry/registry.json
git commit -m "chore: add agency-agents submodule and registry"
```

bashbash**方式 B：直接把专家数据放进仓库**

```bash
# 若不想用 submodule，可复制数据目录
cp -R ../agency-agents/agency-agents data/agency-agents
bash scripts/build_registry.py
```

bashbash> **Vercel 关键**：必须把 `registry/registry.json` 提交进 Git。本地 `data/agency-agents` 是软链接，Vercel 无法读取。推荐构建时内嵌 prompt：

```bash
cd /Users/hh101/Desktop/2025HTML/Cursor/888-PromptX/-Deepduct--/21-NPC/ai-agency
bash scripts/setup_data.sh
python scripts/build_registry.py --embed-prompts
git add registry/registry.json data/locale_zh.json
git commit -m "chore: embed expert registry for Vercel"
```

内嵌后约 2.3MB，对话不再依赖 `data/agency-agents` 下的 `.md` 文件。

### 3. 推送到 GitHub

```bash
git remote add origin https://github.com/你的用户名/ai-agency.git
git branch -M main
git push -u origin main
```

bashbash---

## 部署到 Vercel（live-panel  monorepo）

`ai-agency` **不是独立仓库**，而是 [live-panel](https://github.com/qq8147830/live-panel) 的子目录：

```
live-panel/
├── vercel.json              # 根配置：Vite 构建 + /ai-agency/api 路由
├── api/ai-agency/[...path].py
├── ai-agency/               # 本目录（专家团后端 + static）
└── dist/ai-agency/          # npm run build 复制的静态页
```

### 同步到 live-panel 并推送

在**能访问 GitHub 的机器**上执行：

```bash
# 1. 克隆 live-panel（若尚未克隆）
git clone https://github.com/qq8147830/live-panel.git ~/live-panel

# 2. 从本开发目录同步 ai-agency
cd /Users/hh101/Desktop/2025HTML/Cursor/888-PromptX/-Deepduct--/21-NPC/ai-agency
bash scripts/sync-to-live-panel.sh ~/live-panel

# 3. 提交并推送
cd ~/live-panel
git add ai-agency vercel.json
git commit -m "fix: sync ai-agency with embedded registry for Vercel"
git push origin main
```

`sync-to-live-panel.sh` 会：
- 复制 `ai-agency/`（排除 `venv`、`.env`、软链接 `data/agency-agents`）
- 确保 `registry/registry.json` 为 **内嵌 prompt** 版本（`--embed-prompts`）
- 修补根目录 `vercel.json`，让 Python Serverless 打包 `ai-agency/registry/**`

### Vercel 环境变量（live-panel 项目）

在 Vercel 项目 **Settings → Environment Variables** 添加：

- `OPENAI_API_KEY`
- `OPENAI_BASE_URL`
- `MODEL_NAME`

### 验证

部署后访问：

- 静态页：`https://live-panel-virid.vercel.app/ai-agency/`
- 健康检查：`https://live-panel-virid.vercel.app/api/ai-agency/health`（生产环境请用此路径；`/ai-agency/api/*` rewrite 可能未生效）

应看到 `"experts": 169`, `"embedded_prompts": true`。

---

## 部署到 Vercel（仅 ai-agency 独立调试，不推荐）

以下为历史独立部署说明；生产环境请使用上文 **live-panel monorepo** 方式。

### 1. 导入 GitHub 仓库

1. 登录 [Vercel](https://vercel.com/)
2. 点击 **Add New → Project**
3. 选择你刚推送的 `ai-agency` 仓库
4. Framework Preset 选 **Other**
5. 保持默认 Build 设置（项目已包含 `vercel.json`）

### 2. 配置环境变量

在 Vercel 项目设置中添加（见上文「硅基流动 API 配置」）：

- `OPENAI_API_KEY`
- `OPENAI_BASE_URL`
- `MODEL_NAME`

### 3. 部署

点击 **Deploy**。完成后可通过：

- Vercel 默认域名：`https://你的项目名.vercel.app`
- 或绑定自定义域名

### 4. 注意事项

- **专家列表为空**：打开 `https://你的项目.vercel.app/api/health`，若 `experts: 0` 或 `registry_exists: false`，说明 `registry/registry.json` 未进仓库或未被打包；按上文执行 `--embed-prompts` 后重新提交并 Deploy
- Vercel 项目 **Root Directory** 须设为 `ai-agency`（若从 monorepo 导入）
- NEXUS-Micro 会连续调用 4 次 LLM，耗时较长；`vercel.json` 已设置 `maxDuration: 60` 秒
- 免费版可能有超时限制，复杂任务建议本地运行或升级 Vercel 计划

---

## 专家团功能与领域介绍

AI Agency 专家团基于 [agency-agents](https://github.com/qq8147830/agency-agents) 构建，当前注册 **169 位专家**，覆盖 **14 大领域**。系统支持中英文双语检索与展示，专家名称统一采用「英文名 - 中文名」格式。

### 核心功能

| 功能 | 说明 |
|------|------|
| **专家注册表** | 自动扫描 `data/agency-agents/` 下专家 Markdown，建立可检索索引 |
| **智能路由** | 不指定专家时，根据问题语义自动匹配最合适专家 |
| **手动选专家** | 左侧列表点选专家，或以领域筛选后对话 |
| **双语搜索** | 支持英文、中文关键词检索，如 `frontend`、`前端`、`微博`、`design` |
| **单专家对话** | 以所选专家身份与知识背景回答问题 |
| **NEXUS-Micro** | 按 P1 事故响应流水线，4 位专家序贯协作 |

### 14 大领域概览

#### academic - 学术研究与叙事

面向世界观构建、历史推演、人物心理与叙事结构等深度内容创作与调研场景。

代表专家：
- Anthropologist - 人类学家
- Historian - 历史学家
- Psychologist - 心理学家
- Narratologist - 叙事学家

#### design - 设计

覆盖 UI/UX、品牌视觉、无障碍设计、图像提示词与体验叙事。

代表专家：
- UI Designer - UI 设计师
- UX Architect - UX 架构师
- Brand Guardian - 品牌守护者
- Visual Storyteller - 视觉叙事设计师

#### engineering - 工程开发

涵盖前后端、AI、DevOps、安全、移动端、小程序与架构设计等全栈工程能力。

代表专家：
- Frontend Developer - 前端开发工程师
- Backend Architect - 后端架构师
- AI Engineer - AI 工程师
- DevOps Automator - DevOps 自动化工程师
- Security Engineer - 安全工程师

#### finance - 财务金融

提供财务分析、FP&A、投资研究、税务策略与簿记内控支持。

代表专家：
- Financial Analyst - 财务分析师
- FP&A Analyst - 财务规划与分析分析师
- Investment Researcher - 投资研究员
- Tax Strategist - 税务策略师

#### game-development - 游戏开发

支持游戏设计、关卡设计、叙事设计、技术美术与游戏音频。

代表专家：
- Game Designer - 游戏设计师
- Level Designer - 关卡设计师
- Narrative Designer - 叙事设计师
- Technical Artist - 技术美术师

#### marketing - 营销增长

覆盖国内外主流平台内容策略、SEO、增长黑客、直播电商与私域运营。

代表专家：
- Growth Hacker - 增长黑客
- Weibo Strategist - 微博策略师
- Douyin Strategist - 抖音策略师
- Xiaohongshu Specialist - 小红书专家
- WeChat Official Account Manager - 微信公众号运营经理
- Content Creator - 内容创作者

#### paid-media - 付费媒体投放

聚焦 PPC、程序化采买、付费社交、创意策略与投放度量。

代表专家：
- PPC Campaign Strategist - PPC 投放策略师
- Paid Social Strategist - 付费社交广告策略师
- Ad Creative Strategist - 广告创意策略师
- Tracking & Measurement Specialist - 追踪与度量专家

#### product - 产品管理

负责需求综合、趋势研究、迭代优先级与行为助推设计。

代表专家：
- Product Manager - 产品经理
- Trend Researcher - 趋势研究员
- Feedback Synthesizer - 反馈综合分析师
- Sprint Prioritizer - 迭代优先级专家

#### project-management - 项目管理

提供项目执行、工作室运营、实验追踪与 Jira 工作流管理。

代表专家：
- Senior Project Manager - 高级项目经理
- Project Shepherd - 项目执行负责人
- Studio Producer - 工作室制作人
- Experiment Tracker - 实验追踪专家

#### sales - 销售

覆盖客户策略、外呼拓展、方案投标、管道分析与售前支持。

代表专家：
- Account Strategist - 客户账户策略师
- Deal Strategist - 成交策略师
- Sales Engineer - 售前解决方案工程师
- Pipeline Analyst - 销售管道分析师

#### spatial-computing - 空间计算与 XR

面向 visionOS、XR 界面、沉浸式开发与空间交互设计。

代表专家：
- XR Interface Architect - XR 界面架构师
- visionOS Spatial Engineer - visionOS 空间计算工程师
- XR Immersive Developer - XR 沉浸式开发工程师

#### specialized - 专项领域

包含智能体编排、MCP 构建、合规审计、行业顾问与垂直场景专家。

代表专家：
- Agents Orchestrator - 智能体编排师
- MCP Builder - MCP 构建专家
- Workflow Architect - 工作流架构师
- Study Abroad Advisor - 留学顾问

#### support - 运营支持

负责基础设施维护、客户支持、合规审查、财务追踪与高管摘要。

代表专家：
- Infrastructure Maintainer - 基础设施维护专家
- Support Responder - 客户支持响应专家
- Legal Compliance Checker - 法律合规审查专家
- Executive Summary Generator - 高管摘要生成专家

#### testing - 测试与质量

提供 API 测试、性能基准、无障碍审计、证据收集与现实检验。

代表专家：
- API Tester - API 测试专家
- Reality Checker - 现实检验专家
- Evidence Collector - 证据收集专家
- Performance Benchmarker - 性能基准测试专家

### 使用建议

1. **不确定找谁**：直接提问，系统自动路由；或用中文/英文关键词搜索，如「登录页」「微博运营」。
2. **明确领域**：先在「领域」下拉选择，如 `design - 设计`，再浏览专家列表。
3. **指定专家**：点击左侧专家，右上角会显示如 `Weibo Strategist - 微博策略师 (marketing-weibo-strategist)`。
4. **复杂协作**：切换到 NEXUS-Micro，体验多专家序贯处理事故场景。

> 完整 169 位专家的中英文对照表见 `data/locale_zh.json`。

---

## 常见问题

### Q: 启动后提示找不到专家 prompt？

运行：

```bash
bash scripts/setup_data.sh
python scripts/build_registry.py
```

bashbash### Q: 报错 `OPENAI_API_KEY is not set`？

检查 `.env` 是否存在且已填写 Key，或导出环境变量后重启服务。

### Q: 端口 18888 被占用？

```bash
PORT=18889 bash run_dev.sh
```

bashbash### Q: 为什么注册表是 169 个专家，不是 216？

构建时会排除 `strategy/`、`scripts/`、`examples/` 等非专家目录。`strategy/` 中的 NEXUS 文档用于编排参考，不作为可对话专家注册。

### Q: 如何扩展更多 NEXUS 场景？

编辑 `src/nexus_micro.py`，参考 `agency-agents/strategy/runbooks/` 增加新的流水线定义。

---

## 路线图

- [ ] S2：从 runbook Markdown 自动解析编排步骤
- [ ] 向量检索替代关键词路由
- [ ] 会话记忆与长期记忆
- [ ] NEXUS-Sprint 多阶段流水线
- [ ] 流式输出（SSE）

---

## 许可证

- 本项目运行时：按你的仓库许可证发布
- 专家角色数据：遵循 [agency-agents](https://github.com/qq8147830/agency-agents) 原仓库许可证
