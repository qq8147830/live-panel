<template>
  <div class="h-full glass-card flex flex-col">
    <!-- 头部 -->
    <div class="px-6 py-4 border-b border-white/10">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            📺
          </div>
          <div>
            <h2 class="text-base font-semibold text-white">AiBot数智大屏</h2>
            <p class="text-xs text-gray-400">Live Script Display</p>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <button
            @click="clearHistory"
            class="text-xs text-gray-400 hover:text-white transition-colors"
          >
            清空
          </button>
          <div class="px-3 py-1 rounded-lg bg-primary/20 text-primary text-xs">
            {{ scriptHistory.length }} 条
          </div>
        </div>
      </div>
    </div>
    
    <!-- 话术内容区域 -->
    <div class="flex-1 overflow-hidden flex flex-col p-6 gap-4">
      <!-- 当前话术显示 -->
      <div 
        v-if="currentScript"
        class="p-6 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30"
      >
        <div class="flex items-center gap-2 mb-3">
          <div class="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span class="text-xs text-primary font-medium">正在播报</span>
        </div>
        <p class="text-lg text-white leading-relaxed">{{ currentScript }}</p>
      </div>
      
      <!-- 历史话术列表 -->
      <div class="flex-1 overflow-y-auto space-y-3 pr-2">
        <div
          v-for="script in scriptHistory"
          :key="script.id"
          class="p-4 rounded-lg bg-black/20 border border-white/5 hover:border-white/10 transition-all animate-fade-in"
        >
          <div class="flex items-start justify-between gap-3">
            <p class="text-gray-200 text-sm leading-relaxed flex-1">{{ script.text }}</p>
            <div class="text-xs text-gray-500 whitespace-nowrap">
              {{ formatTime(script.timestamp) }}
            </div>
          </div>
        </div>
        
        <!-- 空状态 -->
        <div
          v-if="scriptHistory.length === 0"
          class="h-full flex items-center justify-center"
        >
          <div class="text-center">
            <div class="text-4xl mb-2">📝</div>
            <p class="text-gray-400 text-sm">暂无话术记录</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 快捷话术 -->
    <div class="px-6 py-4 border-t border-white/10">
      <div class="text-xs text-gray-400 mb-3">快捷话术</div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(shortcut, index) in shortcuts"
          :key="index"
          @click="useShortcut(shortcut)"
          class="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs hover:bg-primary/20 transition-colors"
        >
          {{ shortcut }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/store/useAppStore'

// Store
const appStore = useAppStore()

// 响应式数据
const currentScript = ref('')

// 快捷话术
const shortcuts = [
  '欢迎来到直播间！',
  '感谢大家的关注和点赞！',
  '今天给大家带来超值福利！',
  '喜欢主播的记得点个关注哦~',
  '有什么问题可以在评论区留言！'
]

// 计算属性
const scriptHistory = computed(() => appStore.scriptHistory)

// 方法
const clearHistory = () => {
  if (confirm('确定要清空话术记录吗？')) {
    appStore.scriptHistory = []
  }
}

const useShortcut = (text) => {
  currentScript.value = text
  setTimeout(() => {
    appStore.addScript(text)
    currentScript.value = ''
  }, 100)
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}
</script>

<style scoped>
/* 组件特定样式 */
</style>
