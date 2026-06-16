# 更新日志

## [2.2.0] - 2026-06-16

### ✨ 新增

- **AI Agency 专家团**子模块（`ai-agency/`）
  - 集成至 `/ai-agency/`，169 位专家对话 + NEXUS-Micro 流水线
  - splash 启动页新增「AI Agency 专家团」入口按钮（TeachZhao 右侧，紫金色粒子风）
  - Vite 插件 `scripts/ai-agency-plugin.js`（dev 静态托管 + API 代理至 18888）
  - Vercel Python Serverless：`api/ai-agency/[...path].py`
- **专家数据**：`data/agency-agents/` 直接复制进仓库（约 6.5MB），含 `registry/registry.json`
- **npm 脚本**：`dev:ai-agency`

### 🔧 优化

- `vercel.json` 增加 `/ai-agency/` 路由与 Python 函数 `maxDuration: 60`
- `.gitignore` 忽略 `ai-agency/venv/`、`.env`

## [2.1.1] - 2026-06-15

### 🐛 修复

- **Vercel 部署**：新增根目录 `vercel.json`（`outputDirectory: dist`），修复 `/teachzhao/` 404
- **Vercel API**：新增 `api/teachzhao/[endpoint].js`，线上 `/teachzhao/api/*` 可用

## [2.1.0] - 2026-06-15

### ✨ 新增

- **TeachZhao 数字分身子模块**（`teachzhao/`）
  - 集成至 `/teachzhao/`，Vite 插件 + Express 双端托管
  - 官网 CAPABILITIES 区粒子科技风入口按钮（新窗口打开）
  - TeachZhao 顶栏「🦍 长右灵」返回官网
- **npm 脚本**：`server`、`dev:teachzhao`、`dev:all`
- **构建**：`dist/` 自动包含 `teachzhao/`、官网与 splash 静态页

### 🔧 优化

- TeachZhao 入口按钮增高（`min-height: 2.75rem`，更易点击）
- README 全面重写：启动、访问、API、集成架构、故障排除

## [2.0.0] - 2025-03-30

### 🎉 重大更新

- **全新商用级UI设计**
  - 深色科技主题
  - 霓虹光效系统
  - 玻璃拟态设计
  - 流畅动画过渡

### ✨ 新增功能

- **Three.js 3D数字人**
  - 实时3D渲染
  - 交互式场景控制
  - 丰富的动画效果
  - HUD信息覆盖层
  - 3D/2D模式切换

- **Web Speech API语音播报**
  - 多音色选择
  - 实时语音合成
  - 语音状态可视化
  - 语音播报历史

- **WebSocket连接**
  - 实时连接状态
  - 可视化连接指示
  - 自动重连机制
  - 消息广播支持

- **直播话术大屏**
  - 实时话术展示
  - 历史记录管理
  - 快捷话术支持
  - 时间戳记录

- **控制面板**
  - 动作按钮快捷操作
  - 自定义指令输入
  - 状态实时监控
  - 统计数据展示

### 🎨 UI/UX 改进

- 响应式布局（PC + H5）
- 触摸设备优化
- 无障碍支持（减少动画）
- 深色模式适配
- 高分辨率屏幕优化

### 🔧 技术栈

- Vue 3.4 + Composition API
- Vite 5.0 构建工具
- UnoCSS 0.58 原子化CSS
- Three.js 0.160 3D引擎
- Pinia 2.1 状态管理
- Socket.io 4.6 实时通信

### 📦 项目结构

```
live-panel/
├── src/
│   ├── components/          # 组件目录
│   │   ├── StatusBar.vue   # 顶部状态栏
│   │   ├── ViewportPanel.vue   # 3D渲染区域
│   │   ├── ScriptPanel.vue     # 话术大屏
│   │   ├── ControlPanel.vue    # 控制面板
│   │   └── DigitalHuman3D.vue  # 3D数字人
│   ├── store/              # 状态管理
│   ├── App.vue            # 主应用
│   ├── main.js            # 入口文件
│   └── style.css          # 全局样式
├── public/                # 静态资源
├── index.html
├── package.json
├── vite.config.js
├── uno.config.js
├── README.md
├── STYLE_GUIDE.md
└── DEPLOYMENT.md
```

### 📝 文档

- 完整的README文档
- 详细的样式开发指南
- 全面的部署文档
- 更新日志

### 🚀 部署

- 支持多种部署方式
- Nginx/Apache配置示例
- Vercel/Netlify一键部署
- GitHub Pages支持
- HTTPS配置指南

---

## 未来计划

### [2.1.0] - 计划中

- [ ] AI对话功能集成
- [ ] 更多3D模型支持
- [ ] 录音功能
- [ ] 话术模板系统
- [ ] 数据导出功能
- [ ] 主题切换功能
- [ ] 多语言支持
- [ ] PWA支持

### [2.2.0] - 计划中

- [ ] 实时字幕生成
- [ ] 表情识别
- [ ] 手势控制
- [ ] 多人协作模式
- [ ] 云端同步
- [ ] 插件系统

---

**反馈与建议欢迎提交 Issue 或 Pull Request！**
