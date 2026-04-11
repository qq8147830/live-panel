# AI数字人直播控制面板 - 部署指南

## 🚀 本地开发

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 pnpm >= 8.0.0

### 安装依赖

```bash
# 进入项目目录
cd live-panel

# 安装依赖
npm install

# 或使用 pnpm
pnpm install

# 或使用 yarn
yarn install
```

### 启动开发服务器

```bash
npm run dev
```

开发服务器将在 http://localhost:5173 启动

## 🏗️ 生产构建

### 构建项目

```bash
npm run build
```

构建产物将输出到 `dist` 目录

### 构建选项

在 `vite.config.js` 中配置：

```javascript
export default defineConfig({
  build: {
    target: 'es2015',           // 目标浏览器
    cssTarget: 'chrome80',      // CSS目标
    minify: 'terser',          // 压缩工具
    sourcemap: false,           // 生成source map
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three'],
          'socket-vendor': ['socket.io-client']
        }
      }
    }
  }
})
```

## 📦 部署到静态服务器

### 1. Nginx 部署

#### 上传构建产物

```bash
# 上传 dist 目录到服务器
scp -r dist/* user@server:/var/www/live-panel/
```

#### Nginx 配置

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/live-panel;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 开启 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # 缓存静态资源
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 重启 Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 2. Apache 部署

#### 创建 .htaccess 文件

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

#### 上传文件

```bash
scp -r dist/* user@server:/var/www/html/live-panel/
```

### 3. Vercel 部署

#### 安装 Vercel CLI

```bash
npm install -g vercel
```

#### 部署

```bash
# 在项目根目录执行
vercel

# 按提示完成部署
```

#### 配置 vercel.json

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "cleanUrls": true,
  "trailingSlash": false
}
```

### 4. Netlify 部署

#### 安装 Netlify CLI

```bash
npm install -g netlify-cli
```

#### 部署

```bash
# 构建项目
npm run build

# 部署到 Netlify
netlify deploy --prod --dir=dist
```

#### 配置 netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 5. GitHub Pages 部署

#### 修改 vite.config.js

```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

#### 构建并推送

```bash
npm run build
git add dist
git commit -m "Deploy to GitHub Pages"
git push
```

#### 在 GitHub 设置中配置

1. 进入仓库 Settings > Pages
2. 选择分支（gh-pages）
3. 保存并等待部署完成

## 🌐 环境变量配置

### 开发环境

创建 `.env.development` 文件：

```env
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
```

### 生产环境

创建 `.env.production` 文件：

```env
VITE_API_URL=https://api.your-domain.com
VITE_WS_URL=wss://api.your-domain.com
```

### 在代码中使用

```javascript
const apiUrl = import.meta.env.VITE_API_URL
const wsUrl = import.meta.env.VITE_WS_URL
```

## 🔐 HTTPS 配置

### 使用 Let's Encrypt

```bash
# 安装 certbot
sudo apt-get install certbot

# 获取证书
sudo certbot certonly --webroot -w /var/www/live-panel -d your-domain.com

# 自动续期
sudo certbot renew --dry-run
```

### Nginx SSL 配置

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    root /var/www/live-panel;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

## 📊 性能优化

### 1. 启用 CDN

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  }
})
```

### 2. 图片优化

- 使用 WebP 格式
- 启用懒加载
- 使用响应式图片

### 3. 代码分割

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'pinia'],
          'three-vendor': ['three'],
          'socket-vendor': ['socket.io-client']
        }
      }
    }
  }
})
```

## 🔍 监控和日志

### 添加错误追踪

```javascript
// main.js
import { createApp } from 'vue'

const app = createApp(App)

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err, info)
  // 发送到错误追踪服务
  // sendToErrorTracking(err, info)
}

app.mount('#app')
```

### 性能监控

```javascript
// Performance API
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0]
  console.log('Page Load Time:', perfData.loadEventEnd)
  console.log('DOM Ready:', perfData.domContentLoadedEventEnd)
})
```

## 🔄 CI/CD 集成

### GitHub Actions

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🐛 常见问题

### 构建失败

```bash
# 清除缓存
rm -rf node_modules dist package-lock.json
npm install
npm run build
```

### WebSocket 连接失败

- 检查防火墙设置
- 确认 WebSocket 端口开放
- 检查 SSL 证书配置

### 跨域问题

```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

---

**提示：** 部署前请确保所有环境变量已正确配置，并在生产环境中进行充分测试。
