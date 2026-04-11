// 逻辑音色 -> 浏览器 SpeechSynthesis 可能出现的 voice.name 片段映射
// 注：不同系统/浏览器会提供不同的 voice.name，因此这里用 includes 方式匹配。
export const voiceAliases = {
  // 云清
  "云清": ["Yunhui", "Yun Hui", "云清"],
  // 宇辉
  "宇辉": ["Xiaoxiao", "XiaoXiao", "Microsoft Xiaoxiao", "宇辉"],
  // 伊克
  "伊克": ["Xiaoyi", "Xiao Yi", "伊克"],
  // 云希
  "云希": ["Yunxi", "Yun Xi", "云希"],
}

export const getVoiceAliases = (voiceName) => {
  return voiceAliases[voiceName] || []
}

