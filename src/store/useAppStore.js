import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * 应用状态管理
 * 管理WebSocket连接、语音状态、控制面板状态等
 */
export const useAppStore = defineStore('app', () => {
  // WebSocket连接状态
  const isConnected = ref(false)
  const socket = ref(null)
  const connectionStatus = ref('disconnected') // disconnected, connecting, connected, error
  
  // 语音状态
  const isSpeaking = ref(false)
  const selectedVoice = ref('晓晓')
  const availableVoices = ref([])
  
  // 3D渲染状态
  const currentAnimation = ref('idle')
  const enable3D = ref(true)
  const cameraPosition = ref({ x: 0, y: 0, z: 5 })
  
  // 直播话术
  const scriptHistory = ref([
    {
      id: 1,
      text: '欢迎来到直播间！今天给大家带来超值福利！',
      timestamp: new Date().toISOString()
    }
  ])
  const currentScript = ref('')
  
  // 控制面板状态
  const actionHistory = ref([])
  const remainingCount = ref(100)
  
  // 系统信息
  const systemInfo = ref({
    fps: 60,
    memory: '45MB',
    cpu: '12%',
    uptime: '00:00:00'
  })
  
  // 统计数据
  const stats = computed(() => ({
    totalDialogues: scriptHistory.value.length,
    totalActions: actionHistory.value.length,
    speakingTime: remainingCount.value,
    uptime: systemInfo.value.uptime
  }))
  
  // WebSocket操作
  const connectWebSocket = (url) => {
    connectionStatus.value = 'connecting'
    try {
      // 模拟连接
      setTimeout(() => {
        isConnected.value = true
        connectionStatus.value = 'connected'
      }, 1000)
    } catch (error) {
      connectionStatus.value = 'error'
      console.error('WebSocket连接失败:', error)
    }
  }
  
  const disconnectWebSocket = () => {
    if (socket.value) {
      socket.value.disconnect()
      socket.value = null
    }
    isConnected.value = false
    connectionStatus.value = 'disconnected'
  }
  
  // 语音操作
  const startSpeaking = () => {
    isSpeaking.value = true
    currentAnimation.value = 'speaking'
  }
  
  const stopSpeaking = () => {
    isSpeaking.value = false
    currentAnimation.value = 'idle'
  }
  
  const loadVoices = () => {
    if ('speechSynthesis' in window) {
      const voices = window.speechSynthesis.getVoices()
      availableVoices.value = voices.filter(v => 
        v.lang.includes('zh') || v.lang.includes('zh-CN')
      )
    }
  }
  
  // 动作操作
  const addAction = (action) => {
    actionHistory.value.unshift({
      ...action,
      id: Date.now(),
      timestamp: new Date().toISOString()
    })
    currentAnimation.value = action.animation
    setTimeout(() => {
      currentAnimation.value = 'idle'
    }, 1000)
  }
  
  // 话术操作
  const addScript = (text) => {
    scriptHistory.value.unshift({
      id: Date.now(),
      text,
      timestamp: new Date().toISOString()
    })
    remainingCount.value--
  }
  
  // 重置状态
  const resetStore = () => {
    isConnected.value = false
    connectionStatus.value = 'disconnected'
    isSpeaking.value = false
    actionHistory.value = []
    currentAnimation.value = 'idle'
  }
  
  return {
    // 状态
    isConnected,
    connectionStatus,
    socket,
    isSpeaking,
    selectedVoice,
    availableVoices,
    currentAnimation,
    enable3D,
    cameraPosition,
    scriptHistory,
    currentScript,
    actionHistory,
    remainingCount,
    systemInfo,
    stats,
    
    // 方法
    connectWebSocket,
    disconnectWebSocket,
    startSpeaking,
    stopSpeaking,
    loadVoices,
    addAction,
    addScript,
    resetStore
  }
})
