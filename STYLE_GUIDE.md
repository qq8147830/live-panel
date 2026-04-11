# AI数字人直播控制面板 - 开发指南

## 🎨 样式系统说明

### CSS变量定义

在 `src/style.css` 中定义的核心变量：

```css
:root {
  /* 主题色彩 */
  --color-primary: #00f0ff;      /* 主色调 - 青色 */
  --color-secondary: #7c3aed;     /* 次要色调 - 紫色 */
  --color-accent: #f43f5e;        /* 强调色 - 粉红 */
  --color-success: #10b981;       /* 成功色 - 绿色 */
  --color-warning: #f59e0b;       /* 警告色 - 黄色 */
  
  /* 深色背景 */
  --bg-primary: #0a0e27;         /* 主背景 */
  --bg-secondary: #1a1f3a;       /* 次背景 */
  --bg-tertiary: #242b4d;        /* 三级背景 */
  
  /* 玻璃态 */
  --glass-bg: rgba(26, 31, 58, 0.8);
  --glass-border: rgba(255, 255, 255, 0.1);
  
  /* 霓虹光效 */
  --neon-glow: 0 0 10px rgba(0, 240, 255, 0.8),
                0 0 20px rgba(0, 240, 255, 0.6),
                0 0 30px rgba(0, 240, 255, 0.4);
}
```

### UnoCSS 快捷类

在 `uno.config.js` 中定义的快捷类：

```javascript
shortcuts: {
  'glass': 'backdrop-blur-xl bg-dark-card border border-dark-border',
  'glass-hover': 'hover:bg-white/10 transition-all duration-300',
  'neon-text': 'text-primary drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]',
  'neon-border': 'border-primary/50 shadow-[0_0_15px_rgba(0,240,255,0.3)]',
  'card-base': 'glass rounded-2xl p-6'
}
```

## 🎭 组件样式说明

### 1. StatusBar（顶部状态栏）

**结构：**
- Logo 区域（左侧）
- 状态信息（中间）
- 操作按钮（右侧）

**样式特点：**
- 玻璃态卡片
- 霓虹发光Logo
- 脉冲动画状态指示器

### 2. ViewportPanel（左侧3D渲染区）

**结构：**
- DigitalHuman3D 组件
- 统计信息面板（4列网格）

**样式特点：**
- HUD覆盖层效果
- 扫描线动画
- 角落装饰元素

### 3. ScriptPanel（中间话术大屏）

**结构：**
- 当前话术显示（渐变背景）
- 历史话术列表（滚动）
- 快捷话术按钮

**样式特点：**
- 渐变卡片高亮
- 淡入动画
- 时间戳样式

### 4. ControlPanel（右侧控制面板）

**结构：**
- 音色选择（2列网格）
- 动作按钮（3列网格）
- 语音播报（文本输入）

**样式特点：**
- 渐变按钮
- 悬停缩放效果
- 霓虹边框激活状态

## 🎨 自定义样式

### 修改主题颜色

编辑 `src/style.css`：

```css
:root {
  /* 修改主色调 */
  --color-primary: #ff6b6b;  /* 改为红色 */
  
  /* 修改背景色 */
  --bg-primary: #1a1a2e;
}
```

### 添加新动画

在 `src/style.css` 中添加：

```css
@keyframes my-animation {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.2); opacity: 0; }
}

.my-class {
  animation: my-animation 0.5s ease-out;
}
```

### 添加UnoCSS快捷类

编辑 `uno.config.js`：

```javascript
shortcuts: {
  'my-button': 'px-4 py-2 rounded-lg bg-primary hover:bg-primary/80 transition-all'
}
```

## 📱 响应式断点

| 断点 | 屏幕宽度 | 布局 |
|------|---------|------|
| XL | > 1280px | 三栏完整布局 |
| LG | 1024px - 1279px | 三栏缩小布局 |
| MD | 768px - 1023px | 两栏布局 |
| SM | 480px - 767px | 单栏布局 |
| XS | < 480px | 单栏堆叠布局 |

## 🎯 最佳实践

### 1. 使用UnoCSS工具类

```vue
<!-- 推荐 -->
<div class="glass-card p-6 hover:scale-105 transition-all">

<!-- 不推荐 -->
<div class="custom-card-style">
```

### 2. 保持组件样式隔离

```vue
<style scoped>
/* 组件特定样式 */
.component-specific {
  /* ... */
}
</style>
```

### 3. 使用CSS变量

```css
/* 推荐 */
color: var(--color-primary);

/* 不推荐 */
color: #00f0ff;
```

### 4. 响应式优先考虑移动端

```vue
<!-- 移动优先 -->
<div class="w-full md:w-1/2 lg:w-1/3">
```

## 🔧 调试样式

### Chrome DevTools

1. 打开开发者工具（F12）
2. 切换到 Elements 标签
3. 选中元素查看应用的样式
4. 实时修改CSS变量测试效果

### Vue DevTools

1. 安装 Vue DevTools 扩展
2. 切换到 Components 标签
3. 查看组件树和Props
4. 调试组件状态

## 📊 性能优化

### 减少重绘和回流

- 使用 transform 和 opacity 进行动画
- 避免频繁修改布局属性
- 使用 will-change 提示浏览器

```css
.animated-element {
  will-change: transform;
  transform: translateZ(0);
}
```

### 优化动画性能

```css
/* 使用 transform 和 opacity */
.good-animation {
  transform: translateY(10px);
  opacity: 0.8;
}

/* 避免使用 */
.bad-animation {
  top: 10px;
  width: 100%;
}
```

### 减少DOM操作

- 使用Vue的响应式系统
- 避免直接操作DOM
- 合理使用 v-for 的key

## 🎨 设计系统

### 颜色规范

| 用途 | 颜色 | Hex | 用途 |
|------|------|-----|------|
| 主色 | Primary | #00f0ff | 按钮、链接、高亮 |
| 次色 | Secondary | #7c3aed | 辅助元素、边框 |
| 强调 | Accent | #f43f5e | 重要提示、错误 |
| 成功 | Success | #10b981 | 成功状态 |
| 警告 | Warning | #f59e0b | 警告信息 |
| 背景 | Primary | #0a0e27 | 主背景 |

### 字体规范

| 用途 | 大小 | 权重 | 用途 |
|------|------|------|------|
| H1 | 1.5rem | Bold | 页面标题 |
| H2 | 1.25rem | Semibold | 组件标题 |
| H3 | 1rem | Medium | 小标题 |
| Body | 0.875rem | Regular | 正文 |
| Caption | 0.75rem | Regular | 辅助文本 |

### 间距规范

| 名称 | 值 | 用途 |
|------|-----|------|
| xs | 0.5rem | 紧密元素 |
| sm | 0.75rem | 小间距 |
| md | 1rem | 标准间距 |
| lg | 1.5rem | 大间距 |
| xl | 2rem | 超大间距 |

### 圆角规范

| 名称 | 值 | 用途 |
|------|-----|------|
| sm | 0.5rem | 按钮、输入框 |
| md | 0.75rem | 小卡片 |
| lg | 1rem | 标准卡片 |
| xl | 1.5rem | 大容器 |

---

**提示：** 所有样式修改建议通过CSS变量和UnoCSS快捷类实现，以保持代码的一致性和可维护性。
