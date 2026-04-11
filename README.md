# AI数字人直播控制面板

> 商用级前端界面 | Vue3 + Vite + UnoCSS + Three.js | 深色主题 | 霓虹光效 | 玻璃拟态

## ✨ 特性

- 🎨 **现代化UI设计**
  - 深色科技主题
  - 霓虹光效与玻璃拟态
  - 流畅的动画过渡
  - 响应式布局（PC + H5）

- 🤖 **3D数字人展示**
  - Three.js实时渲染
  - 交互式场景控制
  - 丰富的动画效果
  - HUD信息覆盖层

- 🎙️ **语音播报功能**
  - Web Speech API集成
  - 多音色选择
  - 实时语音合成
  - 语音状态可视化

- 📺 **直播话术大屏**
  - 实时话术展示
  - 历史记录管理
  - 快捷话术支持
  - 时间戳记录

- 🎮 **控制面板**
  - 动作按钮快捷操作
  - 自定义指令输入
  - 状态实时监控
  - 统计数据展示

- 🔌 **WebSocket连接**
  - 实时连接状态
  - 可视化连接指示
  - 自动重连机制
  - 消息广播支持

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📁 项目结构

```
live-panel/
├── src/
│   ├── components/          # 组件目录
│   │   ├── StatusBar.vue   # 顶部状态栏
│   │   ├── ViewportPanel.vue   # 左侧3D渲染区域
│   │   ├── ScriptPanel.vue     # 中间话术大屏
│   │   ├── ControlPanel.vue    # 右侧控制面板
│   │   └── DigitalHuman3D.vue  # 3D数字人组件
│   ├── store/              # 状态管理
│   │   └── useAppStore.js  # 应用状态store
│   ├── App.vue            # 主应用组件
│   ├── main.js            # 应用入口
│   └── style.css          # 全局样式
├── public/                # 静态资源
├── index.html             # HTML入口
├── package.json           # 项目配置
├── vite.config.js         # Vite配置
├── uno.config.js          # UnoCSS配置
└── README.md              # 项目文档
```

## 🎯 核心功能

### 1. 状态管理

使用Pinia进行全局状态管理：

```javascript
import { useAppStore } from '@/store/useAppStore'

const appStore = useAppStore()

// 连接WebSocket
appStore.connectWebSocket('ws://localhost:3001')

// 语音播报
appStore.startSpeaking()
appStore.stopSpeaking()

// 动作操作
appStore.addAction({
  type: 'wave',
  name: '打招呼',
  animation: 'wave'
})
```

### 2. Three.js 3D场景

基于Three.js的3D数字人渲染：

```vue
<DigitalHuman3D 
  :is-speaking="isSpeaking"
  :current-animation="currentAnimation"
/>
```

### 3. Web Speech API

浏览器原生语音合成：

```javascript
const utterance = new SpeechSynthesisUtterance(text)
utterance.lang = 'zh-CN'
window.speechSynthesis.speak(utterance)
```

### 4. WebSocket连接

实时双向通信：

```javascript
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001')
socket.on('connect', () => {
  console.log('已连接')
})
```

## 🎨 自定义配置

### 主题颜色

修改 `src/style.css` 中的CSS变量：

```css
:root {
  --color-primary: #00f0ff;
  --color-secondary: #7c3aed;
  --color-accent: #f43f5e;
  --bg-primary: #0a0e27;
}
```

### UnoCSS配置

修改 `uno.config.js` 自定义样式和动画：

```javascript
export default defineConfig({
  theme: {
    colors: {
      primary: '#00f0ff',
      // ...
    }
  }
})
```

## 📱 响应式断点

- **PC**: > 1024px - 三栏布局
- **Tablet**: 768px - 1024px - 两栏布局
- **Mobile**: < 768px - 单栏堆叠布局

## 🔧 技术栈

- **框架**: Vue 3.4
- **构建工具**: Vite 5.0
- **样式**: UnoCSS 0.58
- **3D引擎**: Three.js 0.160
- **状态管理**: Pinia 2.1
- **实时通信**: Socket.io 4.6
- **组合式API**: VueUse 10.7

## 📄 License

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📮 联系方式

如有问题，请通过以下方式联系：

- 提交 Issue
- 发送邮件

---

**Made with ❤️ by CodeBuddy**
