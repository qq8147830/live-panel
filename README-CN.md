# CY AI BotClaw · 长右灵 Live Panel 中文使用指南

> 商用级 AI 数字人直播控制面板 | Vue 3 + Vite + Python FastAPI | 版本 **2.2.0+**（2026-06-18 更新）

本文档面向中文用户，说明 **运行环境**、**一键本地启动** 与 **AI Agency 专家团** 日常使用。完整英文/混合技术文档见 [README.md](./README.md)。

---

## 本地如何测试（推荐：一条命令）

```bash
cd /Users/hh101/Documents/GitHub/qq8147830/live-panel
npm run dev
```

`npm run dev` 会**并行启动**：

| 服务 | 端口 | 说明 |
|------|------|------|
| Vite 前端 | **5173** | 官网、splash、控制面板、TeachZhao、AI Agency 静态页 |
| AI Agency API | **18888** | FastAPI（由 `scripts/dev.mjs` 自动拉起） |

然后访问：

| 页面 | 地址 |
|------|------|
| 启动页 | http://localhost:5173/splash.html |
| 产品官网 | http://localhost:5173/index.html |
| 控制面板 | http://localhost:5173/app.html |
| TeachZhao | http://localhost:5173/teachzhao/ |
| **AI Agency 专家团** | http://localhost:5173/ai-agency/ |

**验证 AI Agency：** 页面顶部应显示「专家 169 位 · 领域 14 个」，左侧专家列表可加载。本地 API 健康检查：

- http://localhost:5173/api/ai-agency/health（与 Vercel 生产路径一致）
- http://localhost:5173/ai-agency/api/health（兼容旧文档路径）

> 若只需前端、不需要 AI 对话 API，可使用 `npm run dev:vite`。若只需单独调试 Python，可使用 `npm run dev:ai-agency`（直接访问 http://127.0.0.1:18888）。

---

## 登录态与跨模块共享

在 **splash.html** 登录后，会话写入浏览器 `localStorage`（键名 `live-panel-session-v1`），以下页面共享：

| 模块 | 行为 |
|------|------|
| splash.html | 登录 / 退出；下拉：个人资料、我的余额、退出 |
| ai-agency/ | 右上角显示头像 + 用户名；未登录时显示「未登录」并链回 splash |
| teachzhao/ | 打开账户页时读取同一会话，显示登录信息 |

**AI Agency 右上角规则：**

- **已登录**（splash 已传递会话）→ 只显示用户头像与下拉菜单，**不显示**「未登录」按钮
- **未登录** → 显示「👤 未登录」，点击跳转 `/splash.html`

下拉菜单：个人资料 / 我的余额（默认 $10.00）→ 新窗口打开 `/teachzhao/#/account`；退出 → 清除会话并回到 splash。

---

## 上线部署

```bash
git add .
git commit -m "feat: your change message"
git push origin main
```

推送后 Vercel 自动部署。Production 环境变量（`OPENAI_API_KEY` 等）需在 Vercel 控制台配置。部署完成后访问：

- https://live-panel-virid.vercel.app/ai-agency/
- https://live-panel-virid.vercel.app/api/ai-agency/health

---

## 一、项目是什么

**live-panel**（CY AI BotClaw / 长右灵）是一个「统一门户 + 多个 AI 子产品」的全栈项目：

| 模块 | 入口 | 技术栈 | 说明 |
|------|------|--------|------|
| 产品官网 | `index.html` | 静态 HTML | 品牌与能力展示 |
| 登录 / 启动页 | `splash.html` | 静态 HTML | 启动动画、登录、子模块入口 |
| 直播控制面板 | `app.html` | Vue 3 + Three.js | 3D 数字人、话术大屏、Socket.IO |
| TeachZhao 数字分身 | `/teachzhao/` | Node.js 静态 SPA | AI 教师角色系统 |
| **AI Agency 专家团** | `/ai-agency/` | Python FastAPI | 169+ 专家对话 + NEXUS-Micro |

---

## 二、AI Agency 专家团（v2.2.0+）

### 核心能力

| 能力 | 说明 |
|------|------|
| 专家注册表 | 169 位专家，14 大领域，中英文检索 + 关键词自动路由 |
| 单专家对话 | 手动选专家或自动路由；支持快速 / 深度思考；SSE 流式输出 |
| NEXUS-Micro | P1 事故响应 P1–P4 四步流水线；侧栏步骤条说明 |
| 对话历史 | 单专家 / NEXUS-Micro **分别**持久化到 localStorage，刷新后恢复 |
| 用户区 | 与 splash 共享登录态；个人资料 / 余额 / 退出 |

### 集成架构

```text
live-panel/
├── ai-agency/
│   ├── app/main.py               # FastAPI
│   ├── static/index.html         # Web UI
│   ├── data/agency-agents/       # 专家 Markdown
│   ├── registry/registry.json    # 专家索引（Vercel 需 embedded）
│   └── .env                      # LLM 密钥（本地，勿提交）
├── api/ai-agency/[...path].py    # Vercel Python Serverless
├── scripts/
│   ├── dev.mjs                   # npm run dev 一键启动
│   └── ai-agency-plugin.js       # Vite 静态托管 + API 代理
└── vercel.json
```

### 路由规则

| 访问路径 | 本地 dev（5173） | Vercel 生产 |
|----------|------------------|-------------|
| `/ai-agency/` | Vite 托管静态 UI | `dist/ai-agency/index.html` |
| `/api/ai-agency/*` | 代理 → 127.0.0.1:18888 | Python Serverless |
| `/ai-agency/api/*` | 同上（兼容路径） | rewrite 到 Serverless |

---

## 三、运行环境要求

| 软件 | 版本 | 用途 |
|------|------|------|
| Node.js | 18+（推荐 20+） | 前端、脚本、Socket.IO |
| npm | 9+ | 包管理 |
| Python | 3.11+ | AI Agency API（`npm run dev` 会自动用到） |
| 浏览器 | 现代版本 | 访问页面 |

### LLM 环境变量（AI Agency）

文件：`ai-agency/.env`（已在 `.gitignore`，勿提交）

| 变量 | 说明 |
|------|------|
| `OPENAI_API_KEY` | 硅基流动 API Key |
| `OPENAI_BASE_URL` | `https://api.siliconflow.cn/v1` |
| `MODEL_NAME` | 如 `Qwen/Qwen2.5-7B-Instruct` |

模板见 `ai-agency/.env.example`。

### 本地端口一览

| 端口 | 服务 | 启动方式 |
|------|------|----------|
| **5173** | Vite + 全站静态 + AI Agency API 代理 | `npm run dev` |
| **18888** | AI Agency FastAPI | `npm run dev` 自动启动 |
| **3001** | Express + Socket.IO + TeachZhao API | `npm run server` 或 `npm run dev:all` |
| **4173** | TeachZhao 独立调试 | `npm run dev:teachzhao` |

---

## 四、使用场景

### 场景 A：日常开发（官网 + splash + AI Agency）⭐

```bash
cd live-panel
npm run dev
```

访问 http://localhost:5173/splash.html → 登录 → 打开 AI Agency 专家团。

### 场景 B：控制面板 + WebSocket

```bash
npm run dev:all    # Vite + Socket.IO（3001），不含 AI Agency Python
# 另开终端（若需要 AI Agency）
npm run dev:ai-agency
```

或：`npm run dev` + `npm run server`（两个终端）。

### 场景 C：仅 TeachZhao

```bash
npm run dev        # 推荐：http://localhost:5173/teachzhao/
# 或独立端口
npm run dev:teachzhao   # http://127.0.0.1:4173
```

### 场景 D：生产构建

```bash
npm run build
npm run preview
```

检查产物：

```bash
ls dist/ai-agency/index.html
ls dist/teachzhao/index.html
ls dist/splash.html
```

---

## 五、npm 脚本一览

| 命令 | 说明 |
|------|------|
| **`npm run dev`** | ⭐ 一键：Vite（5173）+ AI Agency API（18888） |
| `npm run dev:vite` | 仅 Vite，不含 Python API |
| `npm run dev:ai-agency` | 仅 AI Agency FastAPI（18888） |
| `npm run dev:all` | Socket.IO（3001）+ Vite |
| `npm run server` | Express + Socket.IO + TeachZhao API（3001） |
| `npm run dev:teachzhao` | 仅 TeachZhao（4173） |
| `npm run build` | 构建并复制 teachzhao、ai-agency 到 dist |
| `npm run preview` | 预览 dist |
| `npm run lint` | ESLint |

---

## 六、AI Agency API 接口

开发 / 生产均可用前缀 **`/api/ai-agency`**（推荐，与 Vercel 一致）：

| 路径 | 方法 | 说明 |
|------|------|------|
| `/api/ai-agency/health` | GET | 健康检查 |
| `/api/ai-agency/experts` | GET | 专家列表 |
| `/api/ai-agency/chat` | POST | 单专家对话 |
| `/api/ai-agency/chat/stream` | POST | 流式对话（SSE） |
| `/api/ai-agency/micro` | POST | NEXUS-Micro |
| `/api/ai-agency/micro/pipeline` | GET | 流水线步骤 |

更详细说明：[ai-agency/READMECN.md](./ai-agency/READMECN.md)

---

## 七、故障排除

### AI Agency 一直「正在连接…」或专家列表为空

1. 确认使用 **`npm run dev`**（不是单独的 `npm run dev:vite`）
2. Network 检查 `/api/ai-agency/health` 应返回 JSON（不是 HTML）
3. 若 502，确认 18888 端口 API 已启动

### 显示「AI Agency API 未启动」

Vite 代理无法连接 18888。执行 `npm run dev` 或另开终端 `npm run dev:ai-agency`。

### 自动路由报 No matching expert found

已增强中文分词与关键词路由；仍无匹配时会回退到 `agents-orchestrator`。若仍报错，重启 `npm run dev` 使 Python 代码生效。

### 右上角一直显示「未登录」

需先在 **splash.html** 完成登录；会话键为 `live-panel-session-v1`。同域名 `localhost:5173` 下各模块共享。

### 端口被占用

```bash
lsof -ti:5173 | xargs kill -9
lsof -ti:18888 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

---

## 八、验证清单

- [ ] `npm run dev` 后终端显示 Vite ready + AI Agency 18888 启动
- [ ] http://localhost:5173/splash.html 可打开并可登录
- [ ] http://localhost:5173/ai-agency/ 显示「专家 169 位」
- [ ] 已登录时 ai-agency 右上角为头像，**无**「未登录」按钮
- [ ] 未登录时右上角「未登录」可跳回 splash
- [ ] 单专家自动路由可正常回复
- [ ] 刷新页面后对话历史仍在

---

## 九、相关文档

| 文档 | 说明 |
|------|------|
| [README.md](./README.md) | 完整项目文档 |
| [ai-agency/READMECN.md](./ai-agency/READMECN.md) | AI Agency 技术细节 |
| [teachzhao/readme.md](./teachzhao/readme.md) | TeachZhao 说明 |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | 部署指南 |
| [CHANGELOG.md](./CHANGELOG.md) | 版本历史 |

---

## License

MIT License

---

**CY AI BotClaw Avatar Studio · Copyright © BY HaiDong 2026**
