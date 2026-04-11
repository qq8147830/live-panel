import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    host: true,
    open: '/app.html'  // 指定打开app.html而不是默认的index.html
  },
  build: {
    target: 'es2015',
    cssTarget: 'chrome80',
    rollupOptions: {
      input: {
        app: 'app.html'  // 指定构建入口为app.html
      },
      output: {
        manualChunks: {
          'three-vendor': ['three'],
          'socket-vendor': ['socket.io-client']
        }
      }
    }
  }
})
