# TeachZhao 使用说明

> AI 教师与数字分身角色系统 — 本地可运行、可部署的产品演示站点  
> 版本：1.0.0 · 更新日期：2026-06-15

---

## 目录

- [项目简介](#项目简介)
- [在线地址](#在线地址)
- [目录结构](#目录结构)
- [环境要求](#环境要求)
- [本地开发](#本地开发)
- [页面路由](#页面路由)
- [API 接口](#api-接口)
- [GitHub 仓库](#github-仓库)
- [Vercel 部署](#vercel-部署)
- [常见问题](#常见问题)
- [许可证](#许可证)

---

## 项目简介

TeachZhao 是一个面向**学习者**和**教育工作者**的 AI 教师平台演示站点，提供：

- 产品官网（首页、解决方案、价格、FAQ）
- 角色系统（7 个预设 AI 角色）
- AI 对话、课程生成、登录与账户中心

技术特点：

- **零 npm 依赖**，纯 Node.js 原生 HTTP 服务
- 前端为 Hash 路由 SPA，**无需 webpack / vite 构建**
- 本地开发与 Vercel 线上部署共用同一套 API 逻辑

更完整的产品方案见同目录 [`TeachZhao产品解决方案.md`](./TeachZhao产品解决方案.md)。

### 作为 live-panel 子模块运行

本目录已嵌入上级项目 [live-panel](../README.md)，与官网、控制面板共用同一开发服务器：

| 场景 | 命令 | 访问地址 |
|------|------|----------|
| 与主项目一起开发 | 在上级目录执行 `npm run dev` | http://localhost:5173/teachzhao/ |
| 一键启动（含 Socket.IO） | `npm run dev:all` | 同上 + 控制面板 WebSocket |
| 仅调试 TeachZhao | `npm run dev:teachzhao` | http://127.0.0.1:4173/ |

集成后 API 路径为 `/teachzhao/api/*`；独立运行时仍为 `/api/*`（前端 `app.js` 会自动识别）。

---

## 在线地址

| 环境 | 地址 |
|------|------|
| **Vercel 生产环境** | https://teachzhao.vercel.app |
| **GitHub 源码** | https://github.com/qq8147830/TeachZhao |
| **Vercel 控制台** | https://vercel.com/royzhaos-projects/teachzhao |

---

## 目录结构

```
teachzhao/
├── readme.md                 # 本使用说明
├── package.json              # 项目元信息与 npm 脚本
├── server.js                 # 本地开发 HTTP 服务 + 静态托管
├── vercel.json               # Vercel 部署配置
├── public/
│   ├── index.html            # SPA 入口
│   └── src/
│       ├── app.js            # 前端逻辑（须在 public/ 下，Vercel 才能访问）
│       └── styles.css        # 样式
├── lib/
│   └── api-handlers.js       # 共享 API 业务逻辑
└── api/
    └── [endpoint].js         # Vercel Serverless 路由
```

> **重要**：前端静态资源必须放在 `public/` 目录下。Vercel 只会将 `public/` 中的文件作为静态资源发布；若放在项目根目录的 `src/`，线上会出现页面空白。

---

## 环境要求

| 项目 | 要求 |
|------|------|
| Node.js | **18+**（推荐 20 或更高） |
| npm 依赖 | **无需安装**，零第三方依赖 |
| 操作系统 | macOS / Windows / Linux |
| 浏览器 | Chrome、Edge、Safari、Firefox 等现代浏览器 |

检查 Node.js：

```bash
node -v
```

---

## 本地开发

### 项目路径

```text
AI-Agent/teachzhao
```

绝对路径示例（macOS）：

```text
/Users/hh101/Documents/GitHub/AI-Agent/teachzhao
```

### 启动服务

```bash
cd AI-Agent/teachzhao
npm start
```

等价命令：

```bash
node server.js
```

启动成功后终端输出：

```text
TeachZhao is running at http://127.0.0.1:4173
```

浏览器打开：**http://127.0.0.1:4173/**

> 必须通过本地 HTTP 服务访问，**不要**直接双击打开 `index.html`，否则 `/src/app.js` 无法加载。

### 自定义端口与局域网访问

```bash
# 修改端口
PORT=8080 npm start

# 允许同 WiFi 设备访问
HOST=0.0.0.0 PORT=4173 npm start
```

### 停止服务

在运行服务的终端按 `Ctrl + C`。

端口被占用时：

```bash
# macOS / Linux
lsof -ti:4173 | xargs kill
npm start
```

### 语法检查

```bash
npm run check
```

### 本地模拟 Vercel 环境（可选）

```bash
npm run vercel:dev
```

需先执行 `npx vercel login` 完成 Vercel CLI 授权。

---

## 页面路由

本项目为单页应用（SPA），路由通过 URL Hash（`#/`）切换，无需前端构建。

| 页面 | 本地地址 | 线上地址 |
|------|----------|----------|
| 首页 | http://127.0.0.1:4173/ | https://teachzhao.vercel.app/ |
| 角色系统 | http://127.0.0.1:4173/#/agents | https://teachzhao.vercel.app/#/agents |
| AI 对话 | http://127.0.0.1:4173/#/chat | https://teachzhao.vercel.app/#/chat |
| 登录 / 注册 | http://127.0.0.1:4173/#/login | https://teachzhao.vercel.app/#/login |
| 我的账户 | http://127.0.0.1:4173/#/account | https://teachzhao.vercel.app/#/account |
| 使用指南 | http://127.0.0.1:4173/#/guide | https://teachzhao.vercel.app/#/guide |
| 产品页 | http://127.0.0.1:4173/#/product | https://teachzhao.vercel.app/#/product |
| 解决方案 | http://127.0.0.1:4173/#/solutions | https://teachzhao.vercel.app/#/solutions |
| 价格页 | http://127.0.0.1:4173/#/pricing | https://teachzhao.vercel.app/#/pricing |

**登录说明**：输入任意有效邮箱即可登录；也可输入 `demo` 或使用页面上的微信 / 飞书扫码模拟登录。

---

## API 接口

本地与 Vercel 线上共用以下接口（当前为规则模板模拟，可后续接入真实大模型）：

| 路径 | 方法 | 说明 |
|------|------|------|
| `/api/chat` | POST | AI 对话（`message`, `persona`, `personaData`） |
| `/api/course` | POST | 课程生成（`goal`, `subject`, `level`） |
| `/api/quiz` | POST | 测验生成（`topic`） |
| `/api/login` | POST | 登录 / 注册（`email`, `name`, `role`） |
| `/api/account` | GET | 获取演示账户信息 |

业务逻辑位于 `lib/api-handlers.js`，本地由 `server.js` 调用，线上由 `api/[endpoint].js` 调用。

---

## GitHub 仓库

### 仓库信息

| 项目 | 值 |
|------|-----|
| 仓库地址 | https://github.com/qq8147830/TeachZhao |
| 默认分支 | `main` |
| 应用代码路径 | 仓库内的 **`TeachZhao/`** 子目录 |

> 注意：Git 仓库根目录是 `AI-Agent`，应用代码在其中的 `TeachZhao/`（即本地的 `teachzhao/`）子目录下。

### 克隆仓库

```bash
git clone git@github.com:qq8147830/TeachZhao.git
cd TeachZhao/TeachZhao   # 进入应用目录
npm start
```

### 提交与推送

在 `AI-Agent` 仓库根目录操作：

```bash
cd /path/to/AI-Agent

git add TeachZhao/
git commit -m "描述你的修改"
git push origin main
```

SSH 远程地址：

```bash
git remote set-url origin git@github.com:qq8147830/TeachZhao.git
```

---

## Vercel 部署

### 方式一：Vercel CLI（推荐，已配置）

1. 登录 Vercel CLI（只需一次）：

```bash
npx vercel login
```

浏览器显示 `Authorization successful` 即表示成功。

2. 进入应用目录并部署：

```bash
cd AI-Agent/teachzhao
npx vercel --prod
```

3. 访问生产域名：**https://teachzhao.vercel.app**

后续每次改代码后，在同一目录执行 `npx vercel --prod` 即可更新线上站点。

### 方式二：GitHub 自动部署

1. 打开 [vercel.com/new](https://vercel.com/new)，用 GitHub 登录
2. Import 仓库 `qq8147830/TeachZhao`
3. **关键设置** — Root Directory 填写：

```text
TeachZhao
```

4. 其余保持默认：

| 配置项 | 值 |
|--------|-----|
| Framework Preset | Other |
| Build Command | 留空 |
| Output Directory | 留空 |
| Install Command | 留空 |

5. 点击 **Deploy**

之后每次 `git push` 到 `main` 分支，Vercel 会自动重新部署。

### Vercel 架构说明

| 组件 | 文件 | 作用 |
|------|------|------|
| 静态站点 | `public/` | 首页、JS、CSS |
| Serverless API | `api/[endpoint].js` | `/api/*` 接口 |
| 共享逻辑 | `lib/api-handlers.js` | 本地与线上共用 |
| 部署配置 | `vercel.json` | 缓存策略等 |

---

## 常见问题

### 页面空白 / 只有标题没有内容？

**原因**：前端 JS 未加载（通常是 `/src/app.js` 返回 404）。

**解决**：确认 `app.js` 和 `styles.css` 位于 `public/src/` 目录下，然后重新部署。

### 本地正常，线上 API 报错？

检查 Vercel 部署日志中 `api/[endpoint].js` 是否正常。可在浏览器开发者工具 Network 面板查看 `/api/chat` 等请求状态码。

### 重启服务后登录状态丢失？

用户与对话数据存储在内存中（`lib/api-handlers.js` 的 `DATA` 对象），重启后恢复默认演示数据。生产环境需接入数据库。

### 如何修改默认演示用户或 AI 回复？

编辑 `lib/api-handlers.js` 中的 `DATA.users` 和 `makeTutorReply()` 函数。

### 如何新增角色？

编辑 `public/src/app.js` 顶部的 `roles` 数组，保存后刷新浏览器即可。

---

## 许可证

MIT License · © 2026 TeachZhao.AI

---

**快速回顾**

```bash
# 本地启动
cd AI-Agent/teachzhao && npm start
# → http://127.0.0.1:4173/

# 部署到 Vercel
cd AI-Agent/teachzhao && npx vercel --prod
# → https://teachzhao.vercel.app
```
