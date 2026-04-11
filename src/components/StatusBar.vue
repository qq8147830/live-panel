<template>
  <header class="glass-card h-16 px-6 flex items-center justify-between relative z-10">
    <!-- 左侧 Logo 区域 -->
    <div class="flex items-center gap-4">
      <!-- Logo -->
      <div class="relative">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl neon-glow">
          🦍
        </div>
        <div 
          class="absolute -bottom-1 -right-1 w-3 h-3 rounded-full transition-all"
          :class="isConnected ? 'bg-green-400 pulse-glow' : 'bg-gray-500'"
        />
      </div>
      
      <!-- 标题 -->
      <div>
        <h1 class="text-lg font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          AiBot数智大屏
        </h1>
        <p class="text-xs text-gray-400">Digital Human Live Control Panel</p>
      </div>
    </div>
    
    <!-- 中间状态信息 -->
    <div class="flex items-center gap-6">
      <!-- 连接状态 -->
      <div class="flex items-center gap-2 glass-hover px-4 py-2 rounded-lg">
        <div 
          class="w-2 h-2 rounded-full"
          :class="connectionStatusClass"
        />
        <span class="text-sm text-gray-300">{{ connectionText }}</span>
      </div>
      
      <!-- 系统信息 -->
      <div class="hidden md:flex items-center gap-4 text-xs text-gray-400">
        <div class="flex items-center gap-1">
          <span class="text-primary">FPS:</span>
          <span class="font-mono">{{ systemInfo.fps }}</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="text-primary">CPU:</span>
          <span class="font-mono">{{ systemInfo.cpu }}</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="text-primary">MEM:</span>
          <span class="font-mono">{{ systemInfo.memory }}</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="text-primary">UPTIME:</span>
          <span class="font-mono">{{ systemInfo.uptime }}</span>
        </div>
      </div>
    </div>
    
    <!-- 右侧操作按钮 -->
    <div class="flex items-center gap-3">
      <!-- 连接/断开按钮 -->
      <button
        @click="toggleConnection"
        :class="[
          'px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all',
          isConnected 
            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
            : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
        ]"
      >
        <span>{{ isConnected ? '断开连接' : '连接' }}</span>
      </button>
      
      <!-- 设置按钮 -->
      <button class="glass-hover px-3 py-2 rounded-lg hover:scale-105 transition-transform">
        ⚙️
      </button>
      
      <!-- 全屏按钮 -->
      <button 
        @click="toggleFullscreen"
        class="glass-hover px-3 py-2 rounded-lg hover:scale-105 transition-transform"
      >
        {{ isFullscreen ? '⛶' : '⛶' }}
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/store/useAppStore'

// Store
const appStore = useAppStore()

// 状态
const isFullscreen = ref(false)
const systemInfo = ref({
  fps: 60,
  cpu: '12%',
  memory: '45MB',
  uptime: '00:00:00'
})

// 计算属性
const isConnected = computed(() => appStore.isConnected)
const connectionStatus = computed(() => appStore.connectionStatus)

const connectionStatusClass = computed(() => {
  switch (connectionStatus.value) {
    case 'connected':
      return 'bg-green-400 pulse-glow'
    case 'connecting':
      return 'bg-yellow-400 animate-pulse'
    case 'error':
      return 'bg-red-400'
    default:
      return 'bg-gray-500'
  }
})

const connectionText = computed(() => {
  switch (connectionStatus.value) {
    case 'connected':
      return '已连接'
    case 'connecting':
      return '连接中...'
    case 'error':
      return '连接失败'
    default:
      return '未连接'
  }
})

// 方法
const toggleConnection = () => {
  if (isConnected.value) {
    appStore.disconnectWebSocket()
  } else {
    appStore.connectWebSocket('ws://localhost:3001')
  }
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

// 更新系统信息
const updateSystemInfo = () => {
  // 模拟实时数据更新
  systemInfo.value.fps = Math.floor(58 + Math.random() * 5)
  systemInfo.value.cpu = `${Math.floor(10 + Math.random() * 8)}%`
  systemInfo.value.memory = `${Math.floor(40 + Math.random() * 15)}MB`
  
  // 更新运行时间
  const uptime = parseInt(systemInfo.value.uptime.split(':')[0]) * 3600 +
                  parseInt(systemInfo.value.uptime.split(':')[1]) * 60 +
                  parseInt(systemInfo.value.uptime.split(':')[2]) + 1
  const hours = Math.floor(uptime / 3600).toString().padStart(2, '0')
  const minutes = Math.floor((uptime % 3600) / 60).toString().padStart(2, '0')
  const seconds = (uptime % 60).toString().padStart(2, '0')
  systemInfo.value.uptime = `${hours}:${minutes}:${seconds}`
}

// 生命周期
let intervalId = null

onMounted(() => {
  intervalId = setInterval(updateSystemInfo, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
/* 组件特定样式 */
</style>
