/**
 * 多语言管理 Composable
 * 提供语言切换、翻译查询等功能
 */

import { ref, computed } from 'vue'
import { messages } from '@/locales/messages'

// 语言配置列表
export const languages = [
  { code: 'CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'TW', name: '中文繁體', flag: '🇭🇰' },
  { code: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'JP', name: '日本語', flag: '🇯🇵' }
]

// 当前语言
const currentLangCode = ref('CN')

// 获取当前语言配置
export const currentLanguage = computed(() => {
  return languages.find(lang => lang.code === currentLangCode.value) || languages[0]
})

// 获取翻译文本
export const t = (key) => {
  const langMessages = messages[currentLangCode.value]
  if (!langMessages) {
    // 回退到简体中文
    return messages['CN'][key] || key
  }
  return langMessages[key] || messages['CN'][key] || key
}

// 设置语言
export const setLanguage = (langCode) => {
  if (messages[langCode]) {
    currentLangCode.value = langCode
    // 保存到本地存储
    localStorage.setItem('weiming-lang', langCode)
    console.log(`🌐 Language changed to: ${languages.find(l => l.code === langCode)?.name}`)
    return true
  }
  console.warn(`Language code "${langCode}" not found`)
  return false
}

// 获取当前语言代码
export const getCurrentLangCode = () => currentLangCode.value

// 初始化语言（从本地存储恢复）
export const initLanguage = () => {
  const savedLang = localStorage.getItem('weiming-lang')
  if (savedLang && messages[savedLang]) {
    currentLangCode.value = savedLang
  }
}

// 导出 composable
export function useI18n() {
  return {
    languages,
    currentLanguage,
    currentLangCode,
    t,
    setLanguage,
    getCurrentLangCode,
    initLanguage
  }
}
