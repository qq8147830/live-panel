<template>
  <div class="h-full flex flex-col gap-4">
    <!-- 音色选择 -->
    <div class="glass-card p-5">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            🎙️
          </div>
          <div>
            <h3 class="text-sm font-semibold text-white">音色选择</h3>
            <p class="text-xs text-gray-400">Voice Selection</p>
          </div>
        </div>
        <div class="px-3 py-1 rounded-lg bg-primary/20 text-primary text-xs">
          {{ availableVoices.length }} 个
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="voice in voices"
          :key="voice"
          @click="selectVoice(voice)"
          :class="[
            'px-4 py-2.5 rounded-lg text-sm font-medium transition-all relative overflow-hidden',
            selectedVoice === voice
              ? 'bg-gradient-to-r from-primary to-secondary text-white neon-border'
              : 'bg-black/20 hover:bg-black/30 text-gray-300'
          ]"
        >
          <span>{{ voice }}</span>
        </button>
      </div>
    </div>
    
    <!-- 动作按钮 -->
    <div class="glass-card p-5">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            🎬
          </div>
          <div>
            <h3 class="text-sm font-semibold text-white">动作按钮</h3>
            <p class="text-xs text-gray-400">Action Buttons</p>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-3 gap-3">
        <button
          v-for="action in actions"
          :key="action.type"
          @click="handleAction(action)"
          :class="[
            'p-3 rounded-xl transition-all relative overflow-hidden',
            currentAnimation === action.animation
              ? 'neon-border ring-2 ring-primary/50'
              : 'bg-black/20 hover:bg-black/30 hover:scale-105'
          ]"
        >
          <span class="text-2xl block mb-1">{{ action.icon }}</span>
          <span class="text-xs text-gray-300">{{ action.name }}</span>
        </button>
      </div>
    </div>
    
    <!-- 语音播报 -->
    <div class="glass-card p-5 flex-1 flex flex-col">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
          💬
        </div>
        <div>
          <h3 class="text-sm font-semibold text-white">语音播报</h3>
          <p class="text-xs text-gray-400">Text to Speech</p>
        </div>
      </div>
      
      <!-- 输入框 -->
      <div class="flex-1 flex flex-col gap-3">
        <textarea
          v-model="inputText"
          @keypress.enter.prevent="handleSend"
          :disabled="isSpeaking"
          placeholder="输入要播报的文字..."
          class="flex-1 input-dark rounded-xl p-4 text-sm resize-none focus:outline-none"
          rows="4"
        />
        
        <button
          @click="handleSend"
          :disabled="!inputText.trim() || isSpeaking"
          :class="[
            'w-full py-3 rounded-xl font-medium text-sm transition-all relative overflow-hidden',
            !inputText.trim() || isSpeaking
              ? 'bg-gray-600 cursor-not-allowed opacity-50'
              : 'btn-primary'
          ]"
        >
          <span v-if="isSpeaking" class="flex items-center justify-center gap-2">
            <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full spinner" />
            <span>播报中...</span>
          </span>
          <span v-else>🔊 播报</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '@/store/useAppStore'

// Store
const appStore = useAppStore()

// 响应式数据
const inputText = ref('')
const selectedVoice = ref('晓晓')

// 可用音色
const voices = ['晓晓', '晓伊', '云希', '云健', '晓梦', '晓颜']

// 动作配置
const actions = [
  { name: '打招呼', icon: '👋', type: 'greeting', animation: 'wave', text: '你好呀!' },
  { name: '跳舞', icon: '💃', type: 'dance', animation: 'bounce', text: '一起摇摆吧' },
  { name: '点赞', icon: '👍', type: 'like', animation: 'like', text: '太棒了' },
  { name: '坐下', icon: '🪑', type: 'sit', animation: 'sit', text: '休息一下' },
  { name: '思考', icon: '🤔', type: 'think', animation: 'think', text: '嗯,让我想想' },
  { name: '伤心', icon: '😢', type: 'sad', animation: 'sad', text: '哦,好难过' }
]

// 计算属性
const isSpeaking = computed(() => appStore.isSpeaking)
const currentAnimation = computed(() => appStore.currentAnimation)
const availableVoices = computed(() => appStore.availableVoices)

// 方法
const selectVoice = (voice) => {
  selectedVoice.value = voice
  appStore.selectedVoice = voice
}

const handleAction = (action) => {
  // 记录动作
  appStore.addAction(action)
  
  // 语音播报
  speak(action.text)
  
  // 更新话术
  appStore.addScript(`[${action.name}] ${action.text}`)
}

const handleSend = () => {
  if (!inputText.value.trim() || isSpeaking.value) return
  
  const text = inputText.value
  speak(text)
  appStore.addScript(text)
  inputText.value = ''
}

const speak = (text) => {
  if (!('speechSynthesis' in window)) {
    alert('您的浏览器不支持语音播报功能')
    return
  }
  
  // 开始播报
  appStore.startSpeaking()
  
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'zh-CN'
  utterance.rate = 1
  utterance.pitch = 1
  
  // 选择音色
  const voices = window.speechSynthesis.getVoices()
  const voice = voices.find(v => 
    v.lang.includes('zh') && v.name.includes(selectedVoice.value)
  )
  if (voice) {
    utterance.voice = voice
  }
  
  utterance.onend = () => {
    appStore.stopSpeaking()
  }
  
  utterance.onerror = () => {
    appStore.stopSpeaking()
  }
  
  window.speechSynthesis.speak(utterance)
}

// 生命周期
onMounted(() => {
  appStore.loadVoices()
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      appStore.loadVoices()
    }
  }
})
</script>

<style scoped>
/* 组件特定样式 */
</style>
