# CY AI BotClaw · 长右灵 AI 助手 / Live Panel

> 商用级 AI 数字人直播控制面板 | Vue 3 + Vite + UnoCSS + Three.js | 深色科技主题 · 霓虹光效 · 玻璃拟态

**live-panel**（CY AI BotClaw / 长右灵）是一套面向 AI 数字人、直播与 Agent 场景的全栈前端项目，包含：

- **产品官网** — 品牌与能力展示落地页
- **登录 / 启动页** — 数字人启动动画与登录流程
- **直播控制面板** — Vue 3 商用级控制台（3D 数字人、话术大屏、WebSocket）
- **TeachZhao 数字分身** — 内嵌 AI 教师角色系统子模块

后端提供 Socket.IO 实时通信与 TeachZhao API，当前部分能力为 echo / 规则模板模拟，可扩展接入真实大模型与语音合成。

**当前版本：2.1.1**（2026-06-15）

---

## 项目概览

| 模块 | 入口 | 说明 |
|------|------|------|
| 产品官网 | `index.html` | 静态落地页：CAPABILITIES、朋友圈、7 天指南、工作记录、关于我们 |
| 登录 / 启动页 | `splash.html` | 启动动画、登录弹层，可进入控制面板 |
| 控制面板（主应用） | `app.html` | Vue 3：3D 数字人、话术大屏、控制面板、Socket.IO |
| **TeachZhao 数字分身** | `/teachzhao/` | AI 教师角色系统（Hash SPA，见 `teachzhao/`） |
| 实时服务 | `server/index.js` | Express + Socket.IO + TeachZhao API，默认端口 **3001** |

推荐访问路径：

```text
官网 index.html → splash.html（Login）→ app.html（控制面板）
官网 index.html → /teachzhao/（TeachZhao 数字分身，CAPABILITIES 区按钮新窗口打开）
```

---

## 环境要求

| 项目 | 要求 |
|------|------|
| Node.js | **18+**（推荐 20+） |
| npm | **9+**（或 pnpm / yarn） |
| 浏览器 | Chrome / Edge / Safari / Firefox 现代版本 |

```bash
node -v
npm -v
```

---

## 快速开始

### 1. 安装依赖

```bash
cd live-panel
npm install
```

### 2. 启动前端（含 TeachZhao）

```bash
npm run dev
```

- 端口：**5173**
- `host: true`（局域网可访问）
- 默认自动打开：**`/app.html`**（控制面板）
- **同时托管 TeachZhao**：http://localhost:5173/teachzhao/

### 3. 启动后端（Socket.IO，控制面板推荐）

```bash
npm run server
```

成功输出：

```text
[server] listening on http://localhost:3001
[server] TeachZhao at http://localhost:3001/teachzhao/
```

### 4. 一键启动（前端 + 后端）

```bash
npm run dev:all
```

并行运行 `npm run server` 与 `npm run dev`，适合日常全栈开发。

### 5. 仅独立调试 TeachZhao（可选）

```bash
npm run dev:teachzhao
```

在 **4173** 端口运行 `teachzhao/server.js`，不依赖 Vite。

### 6. 构建与预览

```bash
npm run build    # 产物含 dist/teachzhao/
npm run preview  # 预览生产包（含 /teachzhao/）
```

### npm 脚本一览

| 命令 | 说明 |
|------|------|
| `npm run dev` | Vite 开发服务器（5173），含 TeachZhao |
| `npm run dev:all` | Socket.IO + Vite，推荐 |
| `npm run dev:teachzhao` | 仅 TeachZhao（4173） |
| `npm run server` | Express 后端（3001） |
| `npm run build` | 构建控制面板并复制 TeachZhao |
| `npm run preview` | 预览 dist |
| `npm run lint` | ESLint 检查 |

---

## 访问地址

### 开发环境（`npm run dev`）

| 页面 | 地址 | 说明 |
|------|------|------|
| 控制面板 | http://localhost:5173/app.html | Vue 主应用（dev 默认打开） |
| 产品官网 | http://localhost:5173/index.html | 品牌落地页 |
| 登录 / 启动页 | http://localhost:5173/splash.html | 启动动画与登录 |
| **TeachZhao** | http://localhost:5173/teachzhao/ | AI 教师角色系统 |

官网 **CAPABILITIES · 我能做什么** 右侧按钮「进入 TeachZhao 数字分身智能体」会在**新窗口**打开 `/teachzhao/`（粒子科技风样式，`min-height: 2.75rem`）。

TeachZhao 顶栏 **「🦍 长右灵」** 可返回 `/index.html`。

### 后端直连（`npm run server`）

| 服务 | 地址 |
|------|------|
| Socket.IO | http://localhost:3001 |
| TeachZhao 静态 + API | http://localhost:3001/teachzhao/ |

### 生产环境

```bash
npm run build
```

构建产物 `dist/` 包含：

| 路径 | 内容 |
|------|------|
| `dist/index.html` | 产品官网 |
| `dist/splash.html` 等 | 启动页及静态资源 |
| `dist/app.html` | Vue 控制面板 |
| `dist/teachzhao/` | TeachZhao 子模块 |
| `dist/assets/` | 控制面板打包资源 |

将 **整个 `dist/` 目录** 部署至静态服务器。**Vercel** 已在仓库根目录配置 `vercel.json`（`outputDirectory: dist`），Push 后自动构建部署。

| 环境 | 地址 |
|------|------|
| Vercel 生产 | https://live-panel-virid.vercel.app |
| TeachZhao | https://live-panel-virid.vercel.app/teachzhao/ |
| 产品官网 | https://live-panel-virid.vercel.app/index.html |
| 控制面板 | https://live-panel-virid.vercel.app/app.html |

> TeachZhao API 在 Vercel 上通过 `api/teachzhao/[endpoint].js` Serverless 函数提供，路径仍为 `/teachzhao/api/*`。Socket.IO 控制面板后端需单独 Node 服务，无法纯静态托管。

**WebSocket**：控制面板默认连接 `http://localhost:3001`（见 `src/App.vue` 中 `SOCKET_URL`）。

**局域网**：可用 `http://<本机IP>:5173/...` 访问（Vite 已开启 `host: true`）。

---

## 特性

### 控制面板 UI

- **现代化界面**：深色科技主题、霓虹光效、玻璃拟态、流畅动画
- **响应式布局**：PC 三栏 / 平板两栏 / 手机单栏堆叠
- **3D 数字人**：Three.js 实时渲染、场景交互、动画与 HUD
- **语音播报**：Web Speech API、多音色、状态可视化
- **直播话术大屏**：实时展示、历史记录、快捷话术、时间戳
- **控制面板**：动作按钮、自定义指令、状态监控、统计数据
- **WebSocket**：连接指示、自动重连、消息广播（Socket.IO）

### TeachZhao 数字分身

- **角色军团**：TeachZhao、女娲、孔子、孟母等多 AI 角色
- **AI 对话 / 课程 / 测验**：本地可运行 API（可接大模型）
- **Hash SPA**：零构建前端，集成于 `/teachzhao/`
- **与官网互通**：CAPABILITIES 入口 + 顶栏返回长右灵

### 官网页

- Tailwind CSS + Font Awesome 6
- OpenClaw 能力介绍、轮播图、技能卡片
- 朋友圈、7 天指南、工作记录、关于我们

### UnoCSS（控制面板）

- 原子化 CSS、按需生成
- 渐变背景与预定义动画（pulse、float 等）
- Icons 预设、响应式断点

---

## TeachZhao 数字分身智能体

源码目录：[`teachzhao/`](./teachzhao/)

### 模块简介

面向**学习者**与**教育工作者**的 AI 教师平台演示站点：

- 产品页：首页、解决方案、价格、FAQ
- 角色系统：7+ 预设 AI 角色
- AI 对话、课程生成、登录与账户中心
- 零额外 npm 依赖，Hash 路由 SPA

### 页面路由

| 页面 | 地址 |
|------|------|
| 首页 | http://localhost:5173/teachzhao/ |
| 角色系统 | http://localhost:5173/teachzhao/#/agents |
| AI 对话 | http://localhost:5173/teachzhao/#/chat |
| 登录 | http://localhost:5173/teachzhao/#/login |
| 账户 | http://localhost:5173/teachzhao/#/account |
| 指南 | http://localhost:5173/teachzhao/#/guide |
| 产品 | http://localhost:5173/teachzhao/#/product |
| 解决方案 | http://localhost:5173/teachzhao/#/solutions |
| 价格 | http://localhost:5173/teachzhao/#/pricing |

> 登录：输入有效邮箱即可；或使用 demo / 微信·飞书扫码模拟。

### API 接口

集成模式前缀 **`/teachzhao/api`**（独立 `dev:teachzhao` 时为 `/api`）：

| 路径 | 方法 | 说明 |
|------|------|------|
| `/teachzhao/api/chat` | POST | AI 对话 |
| `/teachzhao/api/course` | POST | 课程生成 |
| `/teachzhao/api/quiz` | POST | 测验生成 |
| `/teachzhao/api/login` | POST | 登录 / 注册 |
| `/teachzhao/api/account` | GET | 演示账户 |

业务逻辑：`teachzhao/lib/api-handlers.js`

### 集成架构

| 组件 | 文件 | 作用 |
|------|------|------|
| Vite 插件 | `scripts/teachzhao-plugin.js` | dev/preview 托管 `/teachzhao/` 与 API |
| Express | `server/index.js` | 生产或 `npm run server` 时提供静态与 API |
| 构建 | `vite.config.js` | `build` 复制到 `dist/teachzhao/` |
| 路径自适应 | `teachzhao/public/src/app.js` | 自动识别 `/teachzhao` 前缀 |

更详细说明：[teachzhao/readme.md](./teachzhao/readme.md) · [TeachZhao产品解决方案.md](./teachzhao/TeachZhao产品解决方案.md)

---

## 项目结构

```text
live-panel/
├── index.html              # 产品官网
├── splash.html             # 登录 / 启动页
├── splash.css / splash.js
├── app.html                # Vue 控制面板入口（Vite 主构建入口）
├── favicon.svg
├── vite.config.js
├── uno.config.js
├── package.json
├── scripts/
│   ├── teachzhao-plugin.js # TeachZhao Vite 集成
│   └── dev-all.mjs         # 一键启动
├── server/
│   └── index.js            # Socket.IO + TeachZhao API（3001）
├── teachzhao/              # TeachZhao 子模块
│   ├── public/             # SPA 静态资源
│   ├── lib/api-handlers.js
│   ├── server.js           # 独立服务（4173）
│   └── readme.md
├── src/
│   ├── App.vue             # 控制面板主界面
│   ├── main.js
│   ├── style.css
│   ├── components/
│   │   ├── StatusBar.vue
│   │   ├── ViewportPanel.vue
│   │   ├── ScriptPanel.vue
│   │   ├── ControlPanel.vue
│   │   └── DigitalHuman3D.vue
│   ├── store/useAppStore.js
│   ├── locales/messages.js
│   ├── sounds/voiceAliases.js
│   └── images/
├── dist/                   # 构建产物
├── DEPLOYMENT.md
├── RUNNING_GUIDE.md
├── STYLE_GUIDE.md
└── CHANGELOG.md
```

---

## 核心功能说明

### 1. 状态管理（Pinia）

```javascript
import { useAppStore } from '@/store/useAppStore'

const appStore = useAppStore()

appStore.connectWebSocket('ws://localhost:3001')
appStore.startSpeaking()
appStore.stopSpeaking()

appStore.addAction({
  type: 'wave',
  name: '打招呼',
  animation: 'wave'
})
```

### 2. Three.js 3D 场景

```vue
<DigitalHuman3D
  :is-speaking="isSpeaking"
  :current-animation="currentAnimation"
/>
```

### 3. Web Speech API

```javascript
const utterance = new SpeechSynthesisUtterance(text)
utterance.lang = 'zh-CN'
window.speechSynthesis.speak(utterance)
```

### 4. Socket.IO 实时通信

```javascript
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001', {
  transports: ['polling', 'websocket']
})

socket.on('connect', () => console.log('已连接'))
socket.on('speak:echo', (payload) => console.log(payload))
```

后端 `server/index.js` 监听 `speak` 事件并 echo `speak:echo`。

### 5. TeachZhao AI 对话

```javascript
const response = await fetch('/teachzhao/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: '如何设计一节 AI 赋能的课？',
    persona: 'TeachZhao'
  })
})
const data = await response.json()
console.log(data.answer)
```

---

## 自定义配置

### 主题颜色

修改 `src/style.css`：

```css
:root {
  --color-primary: #00f0ff;
  --color-secondary: #7c3aed;
  --color-accent: #f43f5e;
  --bg-primary: #0a0e27;
}
```

### UnoCSS

修改 `uno.config.js` 中的主题、颜色与快捷类。

### Vite

`vite.config.js` 可调整端口、默认打开页、构建分包（`three-vendor`、`socket-vendor`）。

---

## 响应式断点

| 断点 | 布局 |
|------|------|
| PC > 1024px | 三栏 |
| Tablet 768–1024px | 两栏 |
| Mobile < 768px | 单栏堆叠 |

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 3.4 |
| 构建 | Vite 5 |
| 样式 | UnoCSS 0.58 |
| 3D | Three.js 0.160 |
| 状态 | Pinia 2.1 |
| 实时通信 | Socket.IO 4.x |
| 工具库 | VueUse 10.7 |
| 官网 | Tailwind CSS（CDN）、Font Awesome 6 |
| TeachZhao | 原生 HTML/CSS/JS、Node.js HTTP |
| 后端 | Express 5 |

---

## 故障排除

### `npm run dev` 失败

- 确认已 `npm install`
- 确认根目录存在 `package.json`

### UnoCSS 导入错误

```text
Failed to resolve import "virtual:uno.css"
```

1. `npm install unocss @unocss/preset-uno @unocss/preset-icons`
2. 确认 `vite.config.js` 含 `UnoCSS()` 插件
3. 确认 `src/main.js` 含 `import 'virtual:uno.css'`

### 端口 5173 / 3001 被占用

```bash
lsof -ti:5173 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### 控制面板 WebSocket 未连接

1. 运行 `npm run server` 或 `npm run dev:all`
2. 检查 `src/App.vue` 中 `SOCKET_URL`

### splash 跳转失败

`splash.js` 跳转至 `http://localhost:5173/app.html`，需先 `npm run dev`。

### TeachZhao 空白或 API 404

1. 通过 `npm run dev` 访问，勿直接双击 `teachzhao/public/index.html`
2. 地址：http://localhost:5173/teachzhao/
3. Network 检查 `/teachzhao/src/app.js`、`/teachzhao/api/chat` 为 200

### Vercel 上 /teachzhao/ 返回 404

1. 确认仓库根目录存在 `vercel.json`，且 `outputDirectory` 为 `dist`
2. 确认 Vercel 项目 **Root Directory** 为仓库根（不是 `teachzhao/` 子目录）
3. 本地执行 `npm run build` 后检查 `dist/teachzhao/index.html` 是否存在
4. 重新 Deploy 或 push 到 `main` 触发构建

---

## 验证启动成功

1. 终端：`VITE v5.x ready in xxx ms`
2. http://localhost:5173/app.html 正常渲染
3. `npm run server` 后 WebSocket 已连接
4. http://localhost:5173/teachzhao/ 可打开且对话有响应
5. 官网 CAPABILITIES 按钮新窗口可打开 TeachZhao

---

## 发布流程

### Vercel（推荐）

仓库已包含根目录 [`vercel.json`](./vercel.json)：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/teachzhao/api/:endpoint", "destination": "/api/teachzhao/:endpoint" },
    { "source": "/teachzhao", "destination": "/teachzhao/index.html" }
  ]
}
```

1. 在 [Vercel](https://vercel.com) Import 仓库 `qq8147830/live-panel`
2. **Framework Preset**：Vite（或 Other，以 `vercel.json` 为准）
3. **Root Directory**：留空（仓库根目录）
4. **Build Command / Output Directory**：由 `vercel.json` 自动读取，无需手填
5. `git push origin main` 后自动重新部署

本地验证构建产物：

```bash
npm run build
ls dist/teachzhao/index.html   # 必须存在
```

### 通用发布

```bash
# 1. 安装依赖（首次或 package.json 变更后）
npm install

# 2. 生产构建
npm run build

# 3. 本地预览（可选）
npm run preview

# 4. 部署 dist/ 至服务器，或 push 至 Git 触发 CI
git add .
git commit -m "release: v2.1.x ..."
git push origin main
```

后端服务（Socket.IO + TeachZhao API）需单独运行或部署：

```bash
npm run server
# 或 PM2 / Docker 等方式托管 server/index.js
```

---

## 版本与更新日志

### [2.1.1] - 2026-06-15

- 修复 Vercel 上 `/teachzhao/` 404：根目录 `vercel.json` + `api/teachzhao/` Serverless

### [2.1.0] - 2026-06-15

- 新增 **TeachZhao 数字分身**子模块，路径 `/teachzhao/`
- 官网 CAPABILITIES 区 TeachZhao 入口按钮（粒子效果、新窗口、加高易点）
- Vite 集成插件 `scripts/teachzhao-plugin.js`，Express 扩展 TeachZhao API
- 新增脚本：`server`、`dev:teachzhao`、`dev:all`
- 构建自动打包官网、splash、TeachZhao 至 `dist/`
- README 全面重写；新增 `.cursor/rules/readme-sync.mdc`（功能变更后自动同步文档）

完整历史见 [CHANGELOG.md](./CHANGELOG.md)。

---

## 文档维护约定

本项目在 `.cursor/rules/readme-sync.mdc` 中约定：**每次功能性代码变更后，Agent 应同步更新 README.md**（访问地址、脚本、特性、更新日志等），无需用户重复提醒。

---

## 相关文档

- [teachzhao/readme.md](./teachzhao/readme.md) — TeachZhao 详细说明
- [teachzhao/TeachZhao产品解决方案.md](./teachzhao/TeachZhao产品解决方案.md) — 产品方案
- [DEPLOYMENT.md](./DEPLOYMENT.md) — 部署指南
- [RUNNING_GUIDE.md](./RUNNING_GUIDE.md) — 运行与排错
- [STYLE_GUIDE.md](./STYLE_GUIDE.md) — UI 规范
- [CHANGELOG.md](./CHANGELOG.md) — 版本历史
- [FAVICON_README.md](./FAVICON_README.md) — 站点图标

---

## License

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request。

## 联系方式

- 提交 GitHub Issue
- 邮件联系项目维护者

---

**Made with ❤️ by CodeBuddy · CY AI BotClaw Avatar Studio Copyright © BY HaiDong 2026**
