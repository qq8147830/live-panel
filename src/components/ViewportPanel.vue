<template>
  <div class="h-full flex flex-col gap-4">
    <!-- 3D 数字人区域 -->
    <div class="flex-1 glass-card overflow-hidden relative">
      <DigitalHuman3D 
        :is-speaking="isSpeaking"
        :current-animation="currentAnimation"
      />
      
      <!-- 动画状态提示 -->
      <div 
        v-if="currentAnimation && currentAnimation !== 'idle'"
        class="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-sm neon-border animate-fade-in"
      >
        <div class="flex items-center gap-2">
          <span class="text-primary">⚡</span>
          <span class="text-white">{{ animationText }}</span>
        </div>
      </div>
    </div>
    
    <!-- 统计信息面板 -->
    <div class="glass-card p-4 grid grid-cols-4 gap-4">
      <div class="text-center p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
        <div class="text-2xl font-bold text-primary neon-text">{{ stats.totalDialogues }}</div>
        <div class="text-xs text-gray-400 mt-1">话术总数</div>
      </div>
      
      <div class="text-center p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
        <div class="text-2xl font-bold text-green-400 neon-text">{{ stats.totalActions }}</div>
        <div class="text-xs text-gray-400 mt-1">动作次数</div>
      </div>
      
      <div class="text-center p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
        <div class="text-2xl font-bold text-yellow-400 neon-text">{{ stats.speakingTime }}</div>
        <div class="text-xs text-gray-400 mt-1">剩余次数</div>
      </div>
      
      <div class="text-center p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
        <div class="text-2xl font-bold text-accent neon-text">{{ formatUptime(stats.uptime) }}</div>
        <div class="text-xs text-gray-400 mt-1">运行时长</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import DigitalHuman3D from './DigitalHuman3D.vue'
import { useAppStore } from '@/store/useAppStore'

// Store
const appStore = useAppStore()

// Props
const props = defineProps({
  isSpeaking: {
    type: Boolean,
    default: false
  },
  currentAnimation: {
    type: String,
    default: 'idle'
  }
})

// 计算属性
const stats = computed(() => appStore.stats)

const animationText = computed(() => {
  const textMap = {
    wave: '👋 打招呼',
    bounce: '💃 跳舞',
    like: '👍 点赞',
    sit: '🪑 坐下',
    think: '🤔 思考',
    sad: '😢 伤心',
    speaking: '🗣️ 说话中'
  }
  return textMap[props.currentAnimation] || '执行中'
})

// 格式化运行时间
const formatUptime = (uptime) => {
  const parts = uptime.split(':')
  if (parts.length === 3) {
    const [h, m, s] = parts
    const hours = parseInt(h)
    if (hours > 0) {
      return `${hours}h ${m}m`
    } else {
      return `${m}m ${s}s`
    }
  }
  return uptime
}
</script>

<style scoped>
/* 组件特定样式 */
</style>
