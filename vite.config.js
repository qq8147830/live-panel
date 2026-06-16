import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { fileURLToPath, URL } from 'node:url'
import { teachzhaoIntegratePlugin } from './scripts/teachzhao-plugin.js'
import { aiAgencyIntegratePlugin } from './scripts/ai-agency-plugin.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    teachzhaoIntegratePlugin(),
    aiAgencyIntegratePlugin()
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
