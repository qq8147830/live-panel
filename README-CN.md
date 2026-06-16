# CY AI BotClaw · 长右灵 Live Panel 中文使用指南

> 商用级 AI 数字人直播控制面板 | Vue 3 + Vite + Python FastAPI | 版本 **2.2.0**（2026-06-16）

本文档面向中文用户，重点说明 **2026-06-16 新增功能**、**新的运行环境** 与 **日常使用方式**。完整英文/混合技术文档见 [README.md](./README.md)。




## 本地如何测试

开**两个终端**：

# 终端 1

cd /Users/hh101/Documents/GitHub/qq8147830/live-panel

npm run dev

# 终端 2

cd /Users/hh101/Documents/GitHub/qq8147830/live-panel

npm rundev:ai-agency

然后访问：

* [http://localhost:5173/splash.html](http://localhost:5173/splash.html) — 看新按钮
* [http://localhost:5173/ai-agency/](http://localhost:5173/ai-agency/) — 应显示「专家 169 位」

本地 API 已测通：`<span class="md-inline-path-prefix">/api/</span><span class="md-inline-path-filename">health</span>` 返回 169 位专家。

---

## 上线部署

git add.

git commit-m"feat: integrate AI Agency expert team at /ai-agency/"

git push origin main

推送后 Vercel 会自动部署。Production 环境变量已就绪，部署完成后可直接访问：

`https://你的域名/ai-agency/`


---

## 一、项目是什么

**live-panel**（CY AI BotClaw / 长右灵）是一个「统一门户 + 多个 AI 子产品」的全栈项目，包含：

| 模块                              | 入口            | 技术栈           | 说明                                     |
| --------------------------------- | --------------- | ---------------- | ---------------------------------------- |
| 产品官网                          | `index.html`  | 静态 HTML        | 品牌与能力展示                           |
| 登录 / 启动页                     | `splash.html` | 静态 HTML        | 启动动画、登录；**子模块入口按钮** |
| 直播控制面板                      | `app.html`    | Vue 3 + Three.js | 3D 数字人、话术大屏、Socket.IO           |
| **TeachZhao 数字分身**      | `/teachzhao/` | Node.js 静态 SPA | AI 教师角色系统                          |
| **AI Agency 专家团** ⭐新增 | `/ai-agency/` | Python FastAPI   | 169+ 专家对话 + NEXUS-Micro 流水线       |

---

## 二、2026-06-16 新增内容（v2.2.0）

### 2.1 AI Agency 专家团子模块

将原独立项目 `ai-agency` 集成进 live-panel，挂载路径 **`/ai-agency/`**。

**核心能力：**

| 能力        | 说明                                      |
| ----------- | ----------------------------------------- |
| 专家注册表  | 169 位专家，14 大领域，支持中英文检索     |
| 单专家对话  | 手动选专家或自动路由，支持快速 / 深度思考 |
| NEXUS-Micro | P1 事故响应 4 步序贯协作流水线            |
| 流式输出    | 单专家模式支持 SSE 流式回复               |

**专家数据来源：**

- 路径：`ai-agency/data/agency-agents/`（约 6.5MB，**真实文件复制**，非软链接）
- 索引：`ai-agency/registry/registry.json`（构建生成，169 条记录）
- 对话时系统会读取每位专家的 Markdown 人设文件，仅有 registry 无法对话

### 2.2 splash 启动页新入口

在 `splash.html` 启动页，**TeachZhao 按钮右侧** 新增：

- 按钮文案：**AI Agency 专家团**
- 样式：紫金色粒子科技风（与 TeachZhao 蓝青色区分）
- 行为：新窗口打开 `/ai-agency/`

### 2.3 新的集成架构

```text
live-panel/
├── ai-agency/                    # Python 子模块源码
│   ├── app/main.py               # FastAPI 应用
│   ├── static/index.html         # 专家团 Web UI
│   ├── data/agency-agents/       # 专家 Markdown 数据
│   ├── registry/registry.json    # 专家索引
│   └── .env                      # LLM 密钥（本地，勿提交 Git）
├── api/ai-agency/[...path].py    # Vercel Python Serverless 入口
├── scripts/ai-agency-plugin.js   # Vite dev/build 集成插件
└── vercel.json                   # 新增 /ai-agency/ 路由
```

text**路由规则：**

| 访问路径             | 本地 dev                   | Vercel 生产                   |
| -------------------- | -------------------------- | ----------------------------- |
| `/ai-agency/`      | Vite 托管静态 UI           | `dist/ai-agency/index.html` |
| `/ai-agency/api/*` | 代理 →`127.0.0.1:18888` | Python Serverless 函数        |

### 2.4 新增 npm 脚本

| 命令     | 端口            | 说明                      |
| -------- | --------------- | ------------------------- |
| `span` | **18888** | 启动 AI Agency Python API |

---

## 三、运行环境要求

### 3.1 软件依赖

| 软件              | 版本            | 用途                       | 是否必须              |
| ----------------- | --------------- | -------------------------- | --------------------- |
| **Node.js** | 18+（推荐 20+） | 前端、TeachZhao、Socket.IO | ✅ 必须               |
| **npm**     | 9+              | 包管理与脚本               | ✅ 必须               |
| **Python**  | 3.11+           | AI Agency 本地 API         | ⚠️ 使用专家团时必须 |
| **浏览器**  | 现代版本        | 访问页面                   | ✅ 必须               |

验证安装：

```bash
node -v    # 应 ≥ v18
```

bash### 3.2 本地端口一览

集成后，开发环境可能同时占用多个端口：

| 端口            | 服务                                        | 启动命令 |
| --------------- | ------------------------------------------- | -------- |
| **5173**  | Vite 前端（含 TeachZhao、AI Agency 静态页） | `span` |
| **3001**  | Express + Socket.IO + TeachZhao API         | `span` |
| **18888** | AI Agency FastAPI                           | `span` |
| **4173**  | TeachZhao 独立调试（可选）                  | `span` |

### 3.3 LLM 环境变量（AI Agency 专用）

文件位置：`ai-agency/.env`（**已在 .gitignore 中忽略，不会提交 GitHub**）

| 变量                | 说明                  | 示例                              |
| ------------------- | --------------------- | --------------------------------- |
| `OPENAI_API_KEY`  | 硅基流动 API Key      | `sk-xxx...`                     |
| `OPENAI_BASE_URL` | OpenAI 兼容接口地址   | `https://api.siliconflow.cn/v1` |
| `MODEL_NAME`      | 模型名称              | `Qwen/Qwen2.5-7B-Instruct`      |
| `LLM_TEMPERATURE` | 采样温度（可选）      | `0.7`                           |
| `PORT`            | 本地 API 端口（可选） | `18888`                         |

模板见 `ai-agency/.env.example`。

---

## 四、使用方式（按场景）

### 场景 A：只用控制面板 + 官网（不需要 AI 对话）

```bash
cd live-panel
```

bash访问：

- 控制面板：http://localhost:5173/app.html
- 启动页：http://localhost:5173/splash.html
- 官网：http://localhost:5173/index.html

---

### 场景 B：使用 TeachZhao 数字分身

```bash
span
```

bash访问：http://localhost:5173/teachzhao/

或从 splash / 官网 CAPABILITIES 区点击「进入 TeachZhao 数字分身智能体」。

---

### 场景 C：使用 AI Agency 专家团 ⭐（推荐双终端）

AI Agency 的 **页面** 由 Vite 托管，**对话 API** 由 Python 提供，需要两个终端：

```bash
# 终端 1：前端（含 /ai-agency/ 静态页）
cd live-panel
```

bash看到如下输出表示 API 启动成功：

```text
Starting AI Agency at http://127.0.0.1:18888
INFO:     Uvicorn running on http://127.0.0.1:18888
```

text访问方式（任选其一）：

1. 浏览器打开 http://localhost:5173/ai-agency/
2. 打开 http://localhost:5173/splash.html ，点击 **「AI Agency 专家团」**

**验证是否成功：** 页面顶部应显示类似「专家 169 位 · 领域 14 个」。若显示 API 未启动错误，请确认终端 2 正在运行。

---

### 场景 D：全栈日常开发（控制面板 + TeachZhao + 后端）

```bash
# 方式 1：一键启动（不含 AI Agency Python）
```

bash---

### 场景 E：生产构建与本地预览

```bash
span
```

bash构建后检查：

```bash
ls dist/teachzhao/index.html    # TeachZhao
ls dist/ai-agency/index.html    # AI Agency ⭐
ls dist/splash.html             # 启动页（含新按钮）
```

bash---

## 五、访问地址速查

### 开发环境（`span` + 按需启动其他服务）

| 页面                       | 地址                              | 前置条件            |
| -------------------------- | --------------------------------- | ------------------- |
| 控制面板                   | http://localhost:5173/app.html    | `span`            |
| 产品官网                   | http://localhost:5173/index.html  | `span`            |
| 启动页                     | http://localhost:5173/splash.html | `span`            |
| TeachZhao                  | http://localhost:5173/teachzhao/  | `span`            |
| **AI Agency 专家团** | http://localhost:5173/ai-agency/  | `span` + `span` |

### 生产环境（Vercel）

| 页面                       | 地址                                            |
| -------------------------- | ----------------------------------------------- |
| 站点根 / 官网              | https://live-panel-virid.vercel.app             |
| 启动页                     | https://live-panel-virid.vercel.app/splash.html |
| 控制面板                   | https://live-panel-virid.vercel.app/app.html    |
| TeachZhao                  | https://live-panel-virid.vercel.app/teachzhao/  |
| **AI Agency 专家团** | https://live-panel-virid.vercel.app/ai-agency/  |

> AI Agency 线上对话依赖 Vercel Python Serverless + 环境变量（见下文部署章节）。

---

## 六、AI Agency 专家团详细说明

### 6.1 功能模式

| 模式                       | 说明                                 |
| -------------------------- | ------------------------------------ |
| **单专家模式**       | 选择一位专家或自动路由；支持流式输出 |
| **NEXUS-Micro 模式** | P1 事故响应流水线，4 位专家序贯协作  |

思考模式：**快速** / **深度** 可切换。

### 6.2 API 接口（集成前缀 `/ai-agency/api`）

| 路径                              | 方法 | 说明               |
| --------------------------------- | ---- | ------------------ |
| `/ai-agency/api/health`         | GET  | 健康检查、专家数量 |
| `/ai-agency/api/experts`        | GET  | 专家列表与搜索     |
| `/ai-agency/api/chat`           | POST | 单专家对话         |
| `/ai-agency/api/chat/stream`    | POST | 流式对话（SSE）    |
| `/ai-agency/api/micro`          | POST | NEXUS-Micro 流水线 |
| `/ai-agency/api/micro/pipeline` | GET  | 流水线步骤说明     |

### 6.3 集成组件说明

| 组件        | 文件                            | 作用                                                |
| ----------- | ------------------------------- | --------------------------------------------------- |
| Vite 插件   | `scripts/ai-agency-plugin.js` | dev 托管静态页；API 代理到 18888；build 复制到 dist |
| Python 应用 | `ai-agency/app/main.py`       | FastAPI 路由与业务                                  |
| Vercel 入口 | `api/ai-agency/[...path].py`  | 线上 Python Serverless                              |
| 前端 UI     | `ai-agency/static/index.html` | 自包含聊天界面（自动识别 `/ai-agency` 前缀）      |

更详细技术文档：[ai-agency/READMECN.md](./ai-agency/READMECN.md)

---

## 七、npm 脚本完整一览

| 命令     | 说明                                                  |
| -------- | ----------------------------------------------------- |
| `span` | Vite 开发服务器（5173），含 TeachZhao、AI Agency 静态 |
| `span` | Socket.IO 后端 + Vite，日常全栈推荐                   |
| `span` | 仅 TeachZhao 独立服务（4173）                         |
| `span` | ⭐ AI Agency FastAPI（18888）                         |
| `span` | Express + Socket.IO + TeachZhao API（3001）           |
| `span` | 构建控制面板，复制 TeachZhao、AI Agency 至 dist       |
| `span` | 预览 dist 生产包                                      |
| `span` | ESLint 检查                                           |

---

## 八、项目目录结构（v2.2.0）

```text
live-panel/
├── index.html                  # 产品官网
├── splash.html                 # 启动页（含 TeachZhao + AI Agency 入口）
├── splash.css / splash.js
├── app.html                    # Vue 控制面板入口
├── vite.config.js
├── vercel.json                 # Vercel 路由（含 /ai-agency/）
├── package.json
│
├── ai-agency/                  # ⭐ AI Agency 专家团（Python）
│   ├── app/main.py
│   ├── static/index.html
│   ├── src/                    # Agent、LLM、专家注册表
│   ├── data/agency-agents/     # 169 位专家 Markdown
│   ├── registry/registry.json
│   ├── run_dev.sh
│   ├── requirements.txt
│   └── .env                    # 本地密钥（勿提交）
│
├── api/
│   ├── teachzhao/[endpoint].js # TeachZhao Node Serverless
│   └── ai-agency/[...path].py    # ⭐ AI Agency Python Serverless
│
├── scripts/
│   ├── teachzhao-plugin.js
│   ├── ai-agency-plugin.js       # ⭐
│   └── dev-all.mjs
│
├── teachzhao/                    # TeachZhao 子模块
├── server/index.js               # Socket.IO + TeachZhao（3001）
├── src/                          # Vue 控制面板源码
└── dist/                         # 构建产物
```

text---

## 九、部署到 Vercel

### 9.1 自动部署

1. Push 代码到 GitHub 仓库 `qq8147830/live-panel`
2. Vercel 自动执行 `span`，输出目录 `dist/`
3. `vercel.json` 处理 `/teachzhao/` 与 `/ai-agency/` 路由

### 9.2 AI Agency 环境变量（Production 必填）

在 Vercel 控制台：**Project → Settings → Environment Variables**

| 变量                | 说明                              |
| ------------------- | --------------------------------- |
| `OPENAI_API_KEY`  | 硅基流动 API Key                  |
| `OPENAI_BASE_URL` | `https://api.siliconflow.cn/v1` |
| `MODEL_NAME`      | 如 `Qwen/Qwen2.5-7B-Instruct`   |
| `LLM_TEMPERATURE` | 可选，默认 `0.7`                |

本地 `ai-agency/.env` 可通过 CLI 同步（需已 `vercel login`）：

```bash
cd live-panel
vercel link    # 首次链接项目
# 逐条添加或使用脚本同步（勿将 .env 提交 Git）
```

bash配置完成后 **Redeploy** 一次使变量生效。

### 9.3 线上注意事项

| 现象      | 说明                                                            |
| --------- | --------------------------------------------------------------- |
| 冷启动    | 久未访问后，首次 AI 对话可能慢 3–8 秒                          |
| 超时      | Serverless 单次请求最长约 60 秒；NEXUS-Micro 多步流水线可能偏紧 |
| Socket.IO | 控制面板 WebSocket 仍需单独 Node 服务，Vercel 静态托管无法提供  |

---

## 十、故障排除

### AI Agency 页面打开但无法对话

1. 确认已运行 `span`（本地）
2. 确认 `ai-agency/.env` 存在且 `OPENAI_API_KEY` 有效
3. 浏览器 Network 检查 `/ai-agency/api/health` 是否返回 200

### 显示「AI Agency API 未启动」

本地 Vite 代理无法连接 18888 端口。请在新终端执行：

```bash
span
```

bash### 专家数量为 0 或 prompt 找不到

1. 确认 `ai-agency/data/agency-agents/` 目录存在且含 `.md` 文件
2. 重新构建 registry：

```bash
cd ai-agency
source venv/bin/activate
python scripts/build_registry.py
```

bash### Vercel 上 /ai-agency/ 404

1. 本地 `span` 后确认 `dist/ai-agency/index.html` 存在
2. 确认根目录 `vercel.json` 含 `/ai-agency` rewrite
3. 重新 Deploy

### 端口被占用

```bash
lsof -ti:5173 | xargs kill -9
lsof -ti:18888 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

bash---

## 十一、验证清单

启动成功后，逐项确认：

- [ ] 终端显示 `VITE v5.x ready`
- [ ] http://localhost:5173/app.html 正常渲染
- [ ] http://localhost:5173/teachzhao/ 可打开
- [ ] `span` 后，http://localhost:5173/ai-agency/ 显示「专家 169 位」
- [ ] splash 页两个子模块按钮均可新窗口打开
- [ ] `span` 后 `dist/ai-agency/index.html` 存在

---

## 十二、版本记录

### [2.2.0] - 2026-06-16 ⭐ 本次更新

- 新增 **AI Agency 专家团** 子模块（`/ai-agency/`，169 专家 + NEXUS-Micro）
- splash 启动页新增「AI Agency 专家团」入口按钮
- 新增 Python 运行环境：`span`（18888）
- Vite 插件 `scripts/ai-agency-plugin.js`
- Vercel Python Serverless `api/ai-agency/[...path].py`
- 专家数据复制至 `ai-agency/data/agency-agents/`

完整历史见 [CHANGELOG.md](./CHANGELOG.md)。

---

## 十三、相关文档

| 文档                                          | 说明                     |
| --------------------------------------------- | ------------------------ |
| [README.md](./README.md)                         | 完整项目文档（中英混合） |
| [ai-agency/READMECN.md](./ai-agency/READMECN.md) | AI Agency 专家团技术细节 |
| [teachzhao/readme.md](./teachzhao/readme.md)     | TeachZhao 说明           |
| [DEPLOYMENT.md](./DEPLOYMENT.md)                 | 部署指南                 |
| [RUNNING_GUIDE.md](./RUNNING_GUIDE.md)           | 运行与排错               |
| [CHANGELOG.md](./CHANGELOG.md)                   | 版本历史                 |

---

## License

MIT License

---

**CY AI BotClaw Avatar Studio · Copyright © BY HaiDong 2026**
