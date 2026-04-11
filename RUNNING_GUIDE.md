# Hai AI BotClaw - 长右灵🦍 直播控制面板

## 项目配置状态 ✅

### ✅ 已完成配置
1. **UnoCSS配置**：已正确配置，包含：
   - UnoCSS插件已集成到Vite
   - 自定义主题、颜色和动画
   - Icons预设支持
   - 快捷方式定义

2. **Vite配置**：
   - 端口：5173
   - 自动打开浏览器
   - 构建优化配置

3. **Favicon和标题**：
   - 浏览器标签页标题："Hai Ai BotClaw - 长右灵🦍"
   - SVG favicon：包含🦍emoji和渐变效果

### 🚀 运行项目

#### 开发模式
```bash
# 进入项目目录
cd "/Users/hh101/Desktop/2025HTML/Cursor/888-PromptX/-Deepduct--/21-NPC/Weiming/live-panel"

# 启动开发服务器
npm run dev
```

开发服务器启动后，访问：**http://localhost:5173/**

#### 构建生产版本
```bash
# 构建项目
npm run build

# 预览构建结果
npm run preview
```

### 🔧 技术栈
- **Vue 3** - 前端框架
- **Vite** - 构建工具
- **UnoCSS** - 原子化CSS引擎
- **Pinia** - 状态管理
- **Three.js** - 3D渲染
- **Socket.IO** - 实时通信

### 🌈 UnoCSS特色功能
1. **原子化CSS**：按需生成，体积小
2. **渐变背景**：丰富的渐变效果
3. **动画系统**：预定义动画（pulse、float等）
4. **图标支持**：Font Awesome图标库
5. **响应式设计**：移动端适配

### 📁 项目结构
```
live-panel/
├── src/                    # 源代码
│   ├── App.vue            # 主应用组件
│   ├── main.js            # 应用入口
│   ├── style.css          # 全局样式
│   └── images/            # 图片资源
├── index.html             # HTML模板
├── package.json           # 依赖配置
├── vite.config.js         # Vite配置
├── uno.config.js          # UnoCSS配置
├── favicon.svg            # 🦍图标
└── server/                # 服务器端代码
```

### 🐛 故障排除

#### 问题：UnoCSS导入错误
**错误信息**：
```
Failed to resolve import "virtual:uno.css"
```

**解决方法**：
1. 确保UnoCSS已安装：
   ```bash
   npm install unocss @unocss/preset-uno @unocss/preset-icons
   ```

2. 检查Vite配置：
   - `vite.config.js` 中已包含 `UnoCSS()` 插件
   - `uno.config.js` 配置文件存在

3. 检查main.js导入：
   ```js
   import 'virtual:uno.css'
   ```

#### 端口占用
如果5173端口被占用：
```bash
# 停止所有Vite进程
pkill -f "vite"

# 或手动查找并终止进程
lsof -ti:5173 | xargs kill -9
```

### ✅ 验证配置成功
1. 运行 `npm run dev`，查看终端输出：
   ```
   VITE v5.4.21  ready in 329 ms
   ```

2. 访问 http://localhost:5173/
3. 检查浏览器开发者工具，确认：
   - 没有UnoCSS相关的404错误
   - CSS已正确加载并应用
   - 页面正常渲染

### 📱 访问其他页面
- **主应用**：http://localhost:5173/
- **启动页面**：http://localhost:5173/splash.html
- **API文档**：http://localhost:5173/api/docs

---

## 开发笔记

### 配置要点
1. **UnoCSS虚拟导入**：使用 `virtual:uno.css` 导入UnoCSS生成的CSS
2. **Vite插件顺序**：确保UnoCSS插件在Vue插件之后
3. **图标CDN**：使用esm.sh CDN提供图标，无需本地安装

### 性能优化
- 代码分割：Three.js和Socket.IO单独打包
- CSS按需生成：UnoCSS只生成使用到的类
- 懒加载：大资源异步加载

### 浏览器兼容性
- 现代浏览器（Chrome 80+、Firefox 78+、Edge 80+、Safari 12+）
- SVG favicon支持
- CSS Grid和Flexbox布局