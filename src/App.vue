<template>
  <div class="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
    <!-- 动态多彩渐变背景 -->
    <div class="absolute inset-0">
      <!-- 多层渐变叠加 -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-blue-900/30"
      />
      <div
        class="absolute inset-0 bg-gradient-to-tr from-pink-900/20 via-transparent to-cyan-900/20"
      />
      <div
        class="absolute inset-0 bg-gradient-to-bl from-yellow-900/15 via-transparent to-green-900/15"
      />

      <!-- 动态光晕 -->
      <div
        class="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
      />
      <div
        class="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 0.5s"
      />
      <div
        class="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 1s"
      />
      <div
        class="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 1.5s"
      />

      <!-- 流动渐变线条 -->
      <div class="absolute inset-0 opacity-30">
        <div
          class="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        />
        <div
          class="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
        />
        <div
          class="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"
        />
      </div>

      <!-- 粒子装饰 -->
      <div
        class="absolute top-[10%] left-[10%] w-2 h-2 bg-blue-400/60 rounded-full animate-ping"
        style="animation-duration: 3s"
      />
      <div
        class="absolute top-[20%] right-[15%] w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-ping"
        style="animation-duration: 4s"
      />
      <div
        class="absolute bottom-[30%] left-[20%] w-2 h-2 bg-yellow-400/60 rounded-full animate-ping"
        style="animation-duration: 3.5s"
      />
      <div
        class="absolute bottom-[15%] right-[25%] w-1.5 h-1.5 bg-green-400/60 rounded-full animate-ping"
        style="animation-duration: 4.5s"
      />
      <div
        class="absolute top-[40%] left-[30%] w-1 h-1 bg-blue-300/60 rounded-full animate-ping"
        style="animation-duration: 5s"
      />
      <div
        class="absolute top-[60%] right-[10%] w-2 h-2 bg-cyan-400/60 rounded-full animate-ping"
        style="animation-duration: 3.8s"
      />
    </div>

    <!-- 顶部导航栏 -->
    <header
      class="h-20 px-6 flex items-center justify-between border-b border-white/5 relative z-10"
    >
      <div class="flex items-center gap-3">
        <button
          @click="goToSplash"
          title="官网首页"
          class="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-cyan-600 to-pink-100 flex items-center justify-center text-white font-bold cursor-pointer hover:opacity-80 transition-opacity group relative"
        >
          <span class="text-4xl">🦍</span>
          <!-- 悬停提示框 -->
          <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            官网首页
          </div>
        </button>
        <div>
          <h1 class="font-semibold ai-main-gradient-text">
            {{ t("nav.title") }}&nbsp;&nbsp;<span class="text-[18px] text-green-500"></span>
<span class="text-[18px] text-green-300"></span>
          </h1>
          <p
            class="text-[10px] uppercase tracking-wider ai-main-gradient-text ai-subtitle"
          >
            {{ t("nav.subtitle") }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
          <span class="text-[13px] text-gray-400">{{ t("nav.working") }}</span>
        </div>
        <!-- 语言切换 -->
        <div class="relative language-menu">
          <button
            @click="toggleLanguageMenu"
            class="flex items-center gap-3 px-1 py-0.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
          >
            <span class="text-lg">{{ currentLanguage.flag }}</span>
            <span class="text-xs text-gray-300">{{
              currentLanguage.code
            }}</span>
            <svg
              class="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <!-- 语言下拉菜单 -->
          <div
            v-if="showLanguageMenu"
            class="absolute right-0 mt- w-36 bg-white border border-white/10 rounded-lg shadow-2xl overflow-hidden"
            style="z-index: 9999"
          >
            <button
              v-for="lang in languages"
              :key="lang.code"
              @click="selectLanguage(lang)"
              class="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 transition-colors text-left"
            >
              <span class="text-lg">{{ lang.flag }}</span>
              <span class="text-xs text-black">{{ lang.name }}</span>
              <svg
                v-if="currentLanguage.code === lang.code"
                class="w-4 h-4 text-green-500 ml-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- 主内容区域 -->
    <main
      class="flex-1 flex h-[calc(100vh-80px)] relative z-10"
      @click="handleOutsideClick"
    >
      <!-- 左侧：动作与设置面板 -->
      <aside
        class="w-[220px] border-r border-white/5 p-4 flex flex-col gap-4 overflow-y-auto"
      >
        <!-- 智能体区域 -->
        <div>
          <h3 class="text-xs text-gray-500 mb-3">{{ t("agent.title") }}</h3>
          <div class="space-y-2">
            <button
              v-for="agent in agents"
              :key="agent.id"
              @click="selectAgent(agent)"
              :class="[
                'w-full flex items-start gap-3 px-3 py-2.5 rounded-lg border transition-all text-left',
                selectedAgent === agent.id
                  ? 'bg-green-200/20 border-purple-500/50'
                  : 'bg-white/5 border-white/5 hover:bg-white/10',
              ]"
            >
              <div
                class="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-xs text-white font-medium shadow-lg flex-shrink-0"
              >
                {{ agent.avatar }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-1.5 mb-1">
                  <span class="text-sm font-medium text-white truncate">{{
                    agent.name
                  }}</span>
                  <span
                    class="px-1.5 py-0.5 rounded bg-purple-500/20 text-[10px] text-purple-400 flex-shrink-0"
                  >
                    {{ agent.role }}
                  </span>
                </div>
                <p class="text-[10px] text-gray-400 truncate">
                  {{ agent.desc }}
                </p>
              </div>
            </button>
          </div>
        </div>

        <!-- 语音控制 -->
        <div>
          <h3 class="text-xs text-gray-500 mb-2">{{ t("voice.title") }}</h3>
          <div class="space-y-2">
            <!-- 麦克风开关和音色选择 -->
            <div class="flex items-center gap-2">
              <button
                @click="toggleMicrophone"
                :class="[
                  'flex-shrink-0 w-8 h-8 rounded-lg border transition-all flex items-center justify-center',
                  isMicrophoneOn
                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                    : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10',
                ]"
                :title="isMicrophoneOn ? t('voice.micOn') : t('voice.micOff')"
              >
                {{ isMicrophoneOn ? "🎙️" : "🔇" }}
              </button>
              <select
                v-model="selectedVoiceTone"
                class="flex-1 bg-white/5 border border-white/5 rounded-lg px-2 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-blue-500/50"
              >
                <option value="default">{{ t("voice.default") }}</option>
                <option value="male1">{{ t("voice.male1") }}</option>
                <option value="male2">{{ t("voice.male2") }}</option>
                <option value="female1">{{ t("voice.female1") }}</option>
                <option value="female2">{{ t("voice.female2") }}</option>
              </select>
            </div>
            <!-- 音量调节 -->
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500 w-6">{{
                t("voice.volume").slice(0, 2)
              }}</span>
              <input
                type="range"
                v-model="voiceVolume"
                min="0"
                max="100"
                class="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                :style="{
                  background: `linear-gradient(to right, #3b82f6 ${voiceVolume}%, rgba(255,255,255,0.1) ${voiceVolume}%)`,
                }"
              />
              <span class="text-xs text-gray-400 w-8 text-right"
                >{{ voiceVolume }}%</span
              >
            </div>
          </div>
        </div>

        <!-- 手势动作 -->
        <div>
          <h3 class="text-xs text-gray-500 mb-3">{{ t("gesture.title") }}</h3>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="action in gestureActions"
              :key="action.type"
              @click="handleAction(action)"
              :class="[
                'flex flex-col items-center gap-1 p-2 rounded-lg border transition-all',
                currentAction === action.type
                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                  : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/10',
              ]"
            >
              <span class="text-lg">{{ action.icon }}</span>
              <span class="text-[10px]">{{ action.name }}</span>
            </button>
          </div>
        </div>

        <!-- 语气风格 -->
        <div>
          <h3 class="text-xs text-gray-500 mb-3">{{ t("style.title") }}</h3>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="style in voiceStyles"
              :key="style.type"
              @click="selectVoiceStyle(style)"
              :class="[
                'flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all',
                currentVoiceStyle === style.type
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10',
              ]"
            >
              <div
                class="w-1.5 h-1.5 rounded-full"
                :class="
                  currentVoiceStyle === style.type
                    ? 'bg-green-400'
                    : 'bg-gray-600'
                "
              />
              {{ style.name }}
            </button>
          </div>
        </div>

        <!-- 配音声线 -->
        <div>
          <h3 class="text-xs text-gray-500 mb-3">{{ t("timbres.title") }}</h3>
          <div class="space-y-2">
            <button
              v-for="voice in voiceOptions"
              :key="voice.id"
              @click="selectVoice(voice)"
              :class="[
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all text-left',
                selectedVoice === voice.id
                  ? 'bg-green-500/20 border-green-500/50'
                  : 'bg-white/5 border-white/5 hover:bg-white/10',
              ]"
            >
              <div
                class="w-8 h-8 rounded-full bg-gradient-to-br from-green-300 to-emerald-500 flex items-center justify-center text-xs text-white font-medium"
              >
                {{ voice.avatar }}
              </div>
              <div>
                <div class="text-sm text-white">{{ voice.name }}</div>
                <div class="text-[10px] text-gray-500">{{ voice.desc }}</div>
              </div>
            </button>
          </div>
        </div>

        <!-- 模块入口 -->
        <div>
          <h3 class="text-xs text-gray-500 mb-2">{{ t("module.title") }}</h3>
          <div class="grid grid-cols-1 gap-2">
            <button
              @click="openModule('3d-config')"
              class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-left"
            >
              <span class="text-sm">🎯</span>
              <span class="text-xs text-gray-300">{{
                t("module.3dConfig")
              }}</span>
            </button>
            <button
              @click="openModule('memory-manage')"
              class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-left"
            >
              <span class="text-sm">🧠</span>
              <span class="text-xs text-gray-300">{{
                t("module.memory")
              }}</span>
            </button>
            <button
              @click="openModule('openclaw-skills')"
              class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-left"
            >
              <span class="text-sm">⚡</span>
              <span class="text-xs text-gray-300">{{
                t("module.skills")
              }}</span>
            </button>
          </div>
        </div>

        <!-- 角色状态 -->
        <div class="mt-auto">
          <div class="flex items-center justify-between text-xs mb-2">
            <span class="text-gray-500">{{ t("status.action") }}</span>
            <span class="text-blue-400">{{ t("status.idle") }}</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-gray-500">{{ t("status.expression") }}</span>
            <span class="text-blue-400">{{ t("status.natural") }}</span>
          </div>
        </div>
      </aside>

      <!-- 中间：3D数字人展示区 -->
      <section class="flex-1 flex flex-col relative" style="z-index: 1">
        <!-- 3D视口 -->
        <div class="flex-1 relative bg-black/20">
          <DigitalHuman3D
            ref="digitalHumanRef"
            :is-speaking="isSpeaking"
            :current-animation="currentAnimation"
            @play-animation="handlePlayAnimationEcho"
          />

          <!-- 顶部参数显示 -->
          <div class="absolute top-4 left-4 flex items-center gap-2">
            <span class="px-2 py-1 rounded bg-white/10 text-xs text-gray-400">{{
              t("viewport.pbr")
            }}</span>
            <span
              class="px-2 py-1 rounded bg-blue-500/20 text-xs text-blue-400 flex items-center gap-1"
            >
              <div class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              {{ t("viewport.aiBotOnline") }}
            </span>
            <div class="flex items-center gap-2 text-xs">
              <span class="text-gray-500">{{
                t("viewport.currentAction")
              }}</span>
              <span class="text-blue-400">{{ t("status.idle") }}</span>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <span class="text-gray-500">{{ t("viewport.expression") }}</span>
              <span class="text-blue-400">{{ t("status.natural") }}</span>
            </div>
            <!-- 状态显示区 -->
            <div class="flex items-center gap-3 ml-4">
              <div class="flex items-center gap-1.5">
                <div
                  class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
                />
                <span class="text-xs text-gray-500">{{
                  t("viewport.openclaw")
                }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <div
                  class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
                />
                <span class="text-xs text-gray-500">{{
                  t("viewport.memory")
                }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <div
                  class="w-1.5 h-1.5 rounded-full"
                  :class="isOnline ? 'bg-green-500' : 'bg-red-500'"
                />
                <span
                  class="text-xs"
                  :class="isOnline ? 'text-gray-500' : 'text-red-400'"
                  >{{ isOnline ? t("nav.online") : t("nav.offline") }}</span
                >
              </div>
            </div>
          </div>

          <!-- 右侧表情参数 -->
          <div class="absolute top-4 right-4 space-y-2">
            <div class="flex items-center gap-2 text-xs">
              <span class="text-gray-500 w-12">Joy</span>
              <div class="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  class="h-full bg-blue-400 rounded-full"
                  style="width: 60%"
                />
              </div>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <span class="text-gray-500 w-12">Surprise</span>
              <div class="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  class="h-full bg-purple-400 rounded-full"
                  style="width: 30%"
                />
              </div>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <span class="text-gray-500 w-12">Blink</span>
              <div class="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  class="h-full bg-green-400 rounded-full"
                  style="width: 80%"
                />
              </div>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <span class="text-gray-500 w-12">Mouth</span>
              <div class="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  class="h-full bg-pink-400 rounded-full"
                  style="width: 45%"
                />
              </div>
            </div>
          </div>

          <!-- 底部角色信息 -->
          <div
            class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <!-- 快速功能区 -->
            <div class="flex items-center gap-2">
              <button
                @click="quickAction('qa')"
                class="px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-xs text-blue-400 hover:bg-blue-500/30 transition-colors"
              >
                {{ t("quick.qa") }}
              </button>
              <button
                @click="quickAction('create')"
                class="px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-xs text-green-400 hover:bg-green-500/30 transition-colors"
              >
                {{ t("quick.create") }}
              </button>
              <button
                @click="quickAction('translate')"
                class="px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-xs text-cyan-400 hover:bg-cyan-500/30 transition-colors"
              >
                {{ t("quick.translate") }}
              </button>
            </div>
            <!-- 角色信息 -->
            <div
              class="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/10"
            >
              <span
                class="text-xl font-medium"
                style="
                  background: linear-gradient(
                    to right,
                    #ffd700,
                    #00ff7f,
                    #87ceeb
                  );
                  -webkit-background-clip: text;
                  background-clip: text;
                  -webkit-text-fill-color: transparent;
                "
                >{{ t("character.name") }}</span
              >
              <span class="text-l text-gray-500 font-medium">{{
                t("character.botclaw")
              }}</span>
              <span
                class="px-2 py-0.5 rounded-full bg-blue-500/20 text-xs text-blue-400"
                >{{ t("character.pro") }}</span
              >
            </div>
          </div>

          <!-- 右侧控制按钮 -->
          <div
            class="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2"
          >
            <button
              class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:bg-white/20 transition-colors"
            >
              ⟲
            </button>
            <button
              class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:bg-white/20 transition-colors"
            >
              +
            </button>
            <button
              class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:bg-white/20 transition-colors"
            >
              −
            </button>
          </div>
        </div>

        <!-- 底部输入区域 -->
        <div class="border-t border-white/5 px-4 pb-4 pt-3 mt-auto bg-gradient-to-t from-black/40 to-transparent relative overflow-visible" style="z-index: 500">
          <!-- 输入框容器 -->
          <div
            :class="[
              'bg-black/40 rounded-xl border-2 transition-all duration-300 overflow-hidden',
              isInputFocused
                ? 'border-blue-400/60 shadow-lg shadow-blue-500/20'
                : 'border-blue-300/30'
            ]"
          >
            <!-- 文件预览区 -->
            <div v-if="uploadedFiles.length > 0" class="px-4 pt-3 flex flex-wrap gap-2">
              <div
                v-for="(file, index) in uploadedFiles"
                :key="index"
                class="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 rounded-lg border border-blue-500/30"
              >
                <span class="text-sm">{{ file.icon }}</span>
                <span class="text-xs text-blue-300">{{ file.name }}</span>
                <button
                  @click="removeFile(index)"
                  class="text-gray-400 hover:text-red-400 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <!-- 文本输入区 -->
            <div class="flex items-start gap-3 px-4 py-3">
              <textarea
                v-model="inputText"
                @focus="isInputFocused = true"
                @blur="isInputFocused = false"
                @keydown.enter.prevent="handleSend"
                :placeholder="isSpeechRecognizing ? '正在聆听...' : '输入消息，AI 即刻为您服务...'"
                :maxlength="2000"
                class="flex-1 bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none resize-none leading-relaxed"
                rows="3"
              />
            </div>

            <!-- 语音识别实时显示 -->
            <div
              v-if="isSpeechRecognizing && speechTranscript"
              class="px-4 pb-2 animate-pulse"
            >
              <div class="flex items-center gap-2 text-xs text-red-400">
                <span class="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
                <span>{{ speechTranscript }}</span>
              </div>
            </div>
          </div>

          <!-- 功能按钮栏 -->
          <div class="flex items-center justify-between mt-3">
            <!-- 左侧功能按钮 -->
            <div class="flex items-center gap-2">
              <!-- 十 按钮 - 弹出菜单 -->
              <div class="relative">
                <button
                  @click="togglePlusMenu"
                  class="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                >
                  <span class="text-lg font-bold">+</span>
                </button>
                <!-- 十 弹窗菜单 - 使用 transform 向上展开 -->
                <div
                  v-if="showPlusMenu"
                  class="absolute left-0 bottom-full mb-2 w-56 bg-gray-900 border border-white/20 rounded-xl shadow-2xl overflow-visible"
                  style="transform: translateY(-8px); z-index: 1000;"
                >
                  <div class="py-2">
                    <button
                      v-for="item in plusMenuItems"
                      :key="item.id"
                      @click="handlePlusMenuAction(item)"
                      class="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition-colors text-left"
                    >
                      <span class="text-lg">{{ item.icon }}</span>
                      <span class="text-sm text-gray-300">{{ item.name }}</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- 分割线 -->
              <div class="w-px h-6 bg-white/10"></div>

              <!-- 快速 按钮 - 模式切换 -->
              <div class="relative">
                <button
                  @click="toggleQuickMode"
                  :class="[
                    'flex items-center gap-1.5 px-3 h-9 rounded-lg border transition-all text-sm',
                    currentQuickMode !== 'quick'
                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  ]"
                >
                  <span>⚡</span>
                  <span>{{ quickModeOptions[currentQuickMode].label }}</span>
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <!-- 快速模式选择 -->
                <div
                  v-if="showQuickMode"
                  class="absolute left-0 bottom-full mb-2 w-44 bg-gray-900 border border-white/20 rounded-xl shadow-2xl overflow-visible"
                  style="transform: translateY(-8px); z-index: 1000;"
                >
                  <div class="py-2">
                    <button
                      v-for="(mode, key) in quickModeOptions"
                      :key="key"
                      @click="selectQuickMode(key)"
                      :class="[
                        'w-full flex items-center gap-2 px-4 py-2.5 hover:bg-white/10 transition-colors text-left',
                        currentQuickMode === key ? 'bg-blue-500/20' : ''
                      ]"
                    >
                      <span class="text-lg">{{ mode.icon }}</span>
                      <div class="flex flex-col">
                        <span class="text-sm text-white">{{ mode.label }}</span>
                        <span class="text-[10px] text-gray-500">{{ mode.desc }}</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <!-- 功能按钮组 -->
              <button
                v-for="btn in functionButtons"
                :key="btn.id"
                @click="handleFunctionClick(btn)"
                :class="[
                  'flex items-center gap-1.5 px-3 h-9 rounded-lg border text-sm transition-all',
                  activeFunction === btn.id
                    ? 'bg-green-500/20 border-green-500/50 text-green-400'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
                ]"
              >
                <span>{{ btn.icon }}</span>
                <span>{{ btn.name }}</span>
              </button>

              <!-- 更多 按钮 -->
              <div class="relative">
                <button
                  @click="toggleMoreMenu"
                  class="flex items-center gap-1.5 px-3 h-9 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all"
                >
                  <span>更多</span>
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/>
                  </svg>
                </button>
                <!-- 更多功能菜单 -->
                <div
                  v-if="showMoreMenu"
                  class="absolute right-0 bottom-full mb-2 w-52 bg-gray-900 border border-white/20 rounded-xl shadow-2xl overflow-visible"
                  style="transform: translateY(-8px); z-index: 1000;"
                >
                  <div class="py-2">
                    <button
                      v-for="item in moreMenuItems"
                      :key="item.id"
                      @click="handleMoreMenuAction(item)"
                      class="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition-colors text-left"
                    >
                      <span class="text-lg">{{ item.icon }}</span>
                      <div class="flex flex-col">
                        <span class="text-sm text-white">{{ item.name }}</span>
                        <span class="text-[10px] text-gray-500">{{ item.desc }}</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 右侧：字数统计和操作按钮 -->
            <div class="flex items-center gap-2">
              <!-- 字数统计 -->
              <span class="text-xs text-gray-500 mr-2">{{ inputText.length }}/2000</span>
              <!-- 麦克风按钮 -->
              <button
                @click="toggleMicrophone"
                :class="[
                  'flex items-center justify-center w-9 h-9 rounded-lg border transition-all',
                  isMicrophoneOn
                    ? 'bg-red-500/20 border-red-500/50 text-red-400 animate-pulse'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                ]"
                title="语音输入"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
              </button>
              <!-- 发送按钮 -->
              <button
                @click="handleSend"
                :disabled="!inputText.trim() || isSpeaking"
                class="flex items-center justify-center w-10 h-9 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/30"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 右侧：直播脚本面板 -->
      <aside class="w-[280px] border-l border-white/5 flex flex-col relative" style="z-index: 0">
        <!-- 头部 -->
        <div
          class="h-12 px-4 flex items-center justify-between border-b border-white/5"
        >
          <h3 class="text-sm text-white">{{ t("panel.title") }}</h3>
          <div class="flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span class="text-xs text-gray-500">{{
              t("panel.websocket")
            }}</span>
          </div>
        </div>

        <!-- 脚本内容 -->
        <div class="flex-1 overflow-y-auto p-4 space-y-3">
          <div
            class="px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20"
          >
            <div class="text-[10px] text-green-400 mb-1">
              {{ t("panel.system") }}
            </div>
            <p class="text-xs text-gray-300">{{ t("panel.ready") }}</p>
          </div>

          <div
            v-for="(script, index) in scripts"
            :key="index"
            class="px-3 py-2 rounded-lg bg-white/5"
          >
            <div class="text-[10px] text-gray-500 mb-1">{{ script.time }}</div>
            <p class="text-xs text-gray-300">{{ script.text }}</p>
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import DigitalHuman3D from "./components/DigitalHuman3D.vue";
import { useI18n } from "./composables/useI18n";
import { io } from "socket.io-client";
import { getVoiceAliases } from "./sounds/voiceAliases";

// 多语言支持
const { t, languages, currentLanguage, setLanguage, initLanguage } = useI18n();

// 初始化
onMounted(() => {
  initLanguage();

  // 语音音色列表初始化
  if ("speechSynthesis" in window) {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      browserVoices.value = Array.isArray(voices) ? voices : [];
    };

    loadVoices();
    // 有些浏览器需要等待 voiceschanged 事件
    window.speechSynthesis.onvoiceschanged = () => loadVoices();
  }

  // 初始化语音识别
  initSpeechRecognition();

  /*
  // WebSocket：用于 speak 事件的统一对齐（后续接入 AI 决策）
  // 不强制只走 websocket：某些环境下 websocket 握手可能失败
  // 允许 polling + websocket 自动协商，避免出现未捕获连接异常
  socket.value = io(SOCKET_URL, {
    transports: ["polling", "websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
  });
  socket.value.on("connect", () => {
    isOnline.value = true;
    console.log(`[WS] connected: ${SOCKET_URL}`);
  });
  socket.value.on("disconnect", () => {
    isOnline.value = false;
    console.log("[WS] disconnected");
  });
  socket.value.on("connect_error", (err) => {
    isOnline.value = false;
    console.error("[WS] connect_error:", err?.message || err);
  });

  socket.value.on("speak:echo", (payload) => {
    console.log("[WS] speak:echo", payload);
    const text = payload?.text;
    const voiceName = typeof payload?.voiceName === "string" ? payload.voiceName : undefined;
    if (typeof text === "string" && text.trim()) {
      // echo 后再播报（用于测试）
      speakText(text, voiceName || getSelectedVoiceName());
      scripts.value.unshift({
        time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
        text: `[echo] ${text}`,
      });
    }
  });
  */
});

// 语音控制状态
const isMicrophoneOn = ref(false);
const selectedVoiceTone = ref("default");
const voiceVolume = ref(80);

// 语音识别状态
const speechRecognition = ref(null);
const isSpeechRecognizing = ref(false);
const speechTranscript = ref("");
const speechError = ref("");

// 底部输入区域状态
const showPlusMenu = ref(false);
const showQuickMode = ref(false);
const showMoreMenu = ref(false);
const currentQuickMode = ref("quick");
const activeFunction = ref("");
const isInputFocused = ref(false);
const uploadedFiles = ref([]);

// 十菜单项
const plusMenuItems = [
  { id: "file", name: "上传文件/图片", icon: "📎" },
  { id: "cloud", name: "选择云盘文件", icon: "☁️" },
  { id: "code", name: "上传代码", icon: "📄" },
  { id: "screenshot", name: "截图提问", icon: "🖼️" },
  { id: "screen", name: "屏幕共享", icon: "🖥️" },
  { id: "app", name: "应用共享", icon: "📱" },
];

// 快速模式选项
const quickModeOptions = {
  quick: { label: "快速", icon: "⚡", desc: "通用模式，快速响应" },
  think: { label: "思考", icon: "🤔", desc: "解决难题，深思熟虑" },
  expert: { label: "专家", icon: "🎓", desc: "研究级，深入分析" },
};

// 更多菜单项
const moreMenuItems = [
  { id: "data", name: "数据分析", icon: "📊", desc: "数据处理与可视化" },
  { id: "translate", name: "翻译", icon: "🌐", desc: "多语言互译" },
  { id: "video", name: "视频生成", icon: "🎬", desc: "AI 视频创作" },
  { id: "meeting", name: "会议记录", icon: "📝", desc: "智能会议纪要" },
  { id: "qa", name: "解题答疑", icon: "❓", desc: "学科问题解答" },
  { id: "research", name: "深入研究", icon: "🔬", desc: "深度学术研究" },
  { id: "podcast", name: "AI播客", icon: "🎙️", desc: "语音播报内容" },
  { id: "super", name: "超能模式", icon: "✨", desc: "全能助手模式" },
];

// 功能按钮
const functionButtons = [
  { id: "ppt", name: "PPT生成", icon: "📑" },
  { id: "code", name: "编程", icon: "💻" },
  { id: "writing", name: "帮我写作", icon: "✍️" },
  { id: "image", name: "图像生成", icon: "🎨" },
  { id: "music", name: "音乐生成", icon: "🎵" },
];

// 状态显示
const isOnline = ref(true);

// 智能体列表
const agents = [
  {
    id: "pioneer",
    name: "Pioneer智",
    role: "用户",
    desc: "创新探索者，富有远见",
    avatar: "智",
  },
  {
    id: "teacher",
    name: "Teacher师",
    role: "用户",
    desc: "知识渊博，师者典范",
    avatar: "师",
  },
  {
    id: "assistant",
    name: "Assistant明",
    role: "用户",
    desc: "高效助手，乐于助人",
    avatar: "明",
  },
  {
    id: "creative",
    name: "Creative创",
    role: "用户",
    desc: "富有创意，思维活跃",
    avatar: "创",
  },
  {
    id: "expert",
    name: "Expert行",
    role: "用户",
    desc: "专业精通，权威可靠",
    avatar: "行",
  },
];

// 手势动作
const gestureActions = [
  { name: "挥手", icon: "👋", type: "wave", animation: "wave" },
  { name: "跳舞", icon: "💃", type: "dance", animation: "dance" },
  { name: "点赞", icon: "👍", type: "like", animation: "like" },
  { name: "坐下", icon: "🪑", type: "sit", animation: "sit" },
  { name: "思考", icon: "🤔", type: "think", animation: "think" },
  { name: "哭泣", icon: "😢", type: "cry", animation: "cry" },
];

// 语气风格
const voiceStyles = [
  { name: "亲切", type: "friendly" },
  { name: "专业", type: "professional" },
  { name: "活泼", type: "lively" },
  { name: "严肃", type: "serious" },
];

// 配音声线
const voiceOptions = [
  { id: "yuhui", name: "云清", desc: "专业严肃", avatar: "清" },
  { id: "xiaoxiao", name: "宇辉", desc: "邻家小哥", avatar: "辉" },
  { id: "xiaoyi", name: "伊克", desc: "成熟知性", avatar: "伊" },
  { id: "yunxi", name: "云希", desc: "活泼可爱", avatar: "希" },
];

// 显示语言菜单状态
const showLanguageMenu = ref(false);

// 状态
const selectedAgent = ref("pioneer");
const currentAction = ref("");
const currentVoiceStyle = ref("friendly");
const selectedVoice = ref("yuhui");
const inputText = ref("");
const isSpeaking = ref(false);
const currentAnimation = ref("idle");
const scripts = ref([]);
const digitalHumanRef = ref(null);

// =========================
// WebSocket + 语音播报
// =========================
const SOCKET_URL = "http://localhost:3001";
const socket = ref(null);
const browserVoices = ref([]);
let warnedVoiceUnsupported = false;

const initSocket = () => {
  if (socket.value) return socket.value;

  socket.value = io(SOCKET_URL, {
    transports: ["polling", "websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
  });

  socket.value.on("connect", () => {
    isOnline.value = true;
    console.log(`[WS] connected: ${SOCKET_URL}`);
  });

  socket.value.on("disconnect", () => {
    isOnline.value = false;
    console.log("[WS] disconnected");
  });

  socket.value.on("connect_error", (err) => {
    isOnline.value = false;
    console.error("[WS] connect_error:", err?.message || err);
  });

  socket.value.on("speak:echo", (payload) => {
    console.log("[WS] speak:echo", payload);
    const text = payload?.text;
    const voiceName = typeof payload?.voiceName === "string" ? payload?.voiceName : undefined;
    if (typeof text === "string" && text.trim()) {
      speakText(text, voiceName || getSelectedVoiceName());
      scripts.value.unshift({
        time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
        text: `[echo] ${text}`,
      });
    }
  });

  return socket.value;
};

const loadBrowserVoices = () => {
  if (!("speechSynthesis" in window)) return;
  const voices = window.speechSynthesis.getVoices();
  browserVoices.value = Array.isArray(voices) ? voices : [];
};

const getSelectedVoiceName = () => {
  const v = voiceOptions.find((x) => x.id === selectedVoice.value);
  return v?.name || "云清";
};

const resolveVoiceByName = (voiceName, voices) => {
  if (!voiceName) return undefined;
  const aliases = getVoiceAliases(voiceName);
  const lowered = (s) => String(s || "").toLowerCase();
  const candidates = (aliases || []).map(lowered).filter(Boolean);
  const list = voices || browserVoices.value || [];

  return list.find((v) => {
    const vn = lowered(v?.name);
    return candidates.some((a) => vn.includes(a));
  });
};

// speakText: 统一由前端调用浏览器 SpeechSynthesis，后端仅 echo（用于后续 AI 决策对齐接口）
const speakText = (text, voiceName) => {
  if (!("speechSynthesis" in window)) {
    alert("您的浏览器不支持语音播报功能");
    return;
  }
  if (!text || !text.trim()) return;

  if (!warnedVoiceUnsupported) {
    const voices = browserVoices.value || window.speechSynthesis.getVoices();
    const zhVoices = (voices || []).filter((v) => (v.lang || "").toLowerCase().includes("zh"));
    if (!zhVoices.length) {
      const msg =
        "[TTS] 未发现中文语音。请尝试安装/选择类似 Microsoft Xiaoxiao 的中文 TTS 语音（或在系统/浏览器中安装中文语音包）。";
      console.warn(msg);
      alert(msg);
      warnedVoiceUnsupported = true;
    }
  }

  // 如果 voices 尚未加载，尝试再取一次
  if (!browserVoices.value.length) loadBrowserVoices();

  // 避免队列叠加
  window.speechSynthesis.cancel();

  isSpeaking.value = true;
  currentAnimation.value = "speaking";

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 1;
  utterance.pitch = 1;

  const voice = resolveVoiceByName(voiceName, browserVoices.value);
  if (voice) utterance.voice = voice;

  utterance.onend = () => {
    isSpeaking.value = false;
    currentAnimation.value = "idle";
  };
  utterance.onerror = () => {
    isSpeaking.value = false;
    currentAnimation.value = "idle";
  };

  console.log("[TTS] speakText:", { text, voiceName });
  window.speechSynthesis.speak(utterance);
};

// 语言切换方法
const toggleLanguageMenu = () => {
  showLanguageMenu.value = !showLanguageMenu.value;
};

const selectLanguage = (lang) => {
  setLanguage(lang.code);
  showLanguageMenu.value = false;
};

const handleOutsideClick = (event) => {
  if (!event.target.closest(".language-menu")) {
    showLanguageMenu.value = false;
  }
  // 关闭所有输入区域菜单
  if (!event.target.closest(".input-menu")) {
    showPlusMenu.value = false;
    showQuickMode.value = false;
    showMoreMenu.value = false;
  }
};

// 语音控制方法
const initSpeechRecognition = () => {
  // 检查浏览器是否支持语音识别
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.warn("⚠️ 当前浏览器不支持语音识别功能");
    return;
  }

  speechRecognition.value = new SpeechRecognition();
  speechRecognition.value.continuous = true; // 持续识别
  speechRecognition.value.interimResults = true; // 返回临时结果
  speechRecognition.value.lang = "zh-CN"; // 设置语言为中文

  // 识别结果处理
  speechRecognition.value.onresult = (event) => {
    let finalTranscript = "";
    let interimTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }

    // 更新识别文本
    if (finalTranscript) {
      inputText.value += finalTranscript;
      speechTranscript.value = "";
    } else {
      speechTranscript.value = interimTranscript;
    }
  };

  // 识别错误处理
  speechRecognition.value.onerror = (event) => {
    console.error("❌ 语音识别错误:", event.error);
    speechError.value = event.error;

    if (event.error === "not-allowed") {
      alert("请允许麦克风访问权限");
    }

    // 自动停止识别
    stopSpeechRecognition();
  };

  // 识别结束
  speechRecognition.value.onend = () => {
    if (isSpeechRecognizing.value) {
      // 如果还在识别状态，重新开始
      try {
        speechRecognition.value?.start();
      } catch (e) {
        isSpeechRecognizing.value = false;
        isMicrophoneOn.value = false;
      }
    }
  };
};

const startSpeechRecognition = () => {
  if (!speechRecognition.value) {
    initSpeechRecognition();
  }

  if (!speechRecognition.value) {
    alert("当前浏览器不支持语音识别功能");
    return;
  }

  try {
    speechRecognition.value.start();
    isSpeechRecognizing.value = true;
    speechTranscript.value = "";
    speechError.value = "";
    console.log("🎤 语音识别已开始，请说话...");
  } catch (e) {
    console.error("启动语音识别失败:", e);
  }
};

const stopSpeechRecognition = () => {
  try {
    speechRecognition.value?.stop();
  } catch (e) {
    // 忽略停止时的错误
  }
  isSpeechRecognizing.value = false;
  speechTranscript.value = "";

  // 将临时识别的文本追加到输入框
  if (inputText.value && !inputText.value.endsWith(" ")) {
    inputText.value += " ";
  }
};

const toggleMicrophone = () => {
  isMicrophoneOn.value = !isMicrophoneOn.value;

  if (isMicrophoneOn.value) {
    console.log("🎤 麦克风开启，开始语音识别...");
    startSpeechRecognition();

    // 添加到脚本记录
    scripts.value.unshift({
      time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
      text: "[语音输入] 开始录音",
    });
  } else {
    console.log("🎤 麦克风关闭，停止语音识别");
    stopSpeechRecognition();

    // 添加到脚本记录
    scripts.value.unshift({
      time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
      text: `[语音输入] ${inputText.value || "(无内容)"}`,
    });
  }
};

// 十菜单控制
const togglePlusMenu = () => {
  console.log("=== 十菜单点击 ===");
  console.log("当前状态:", showPlusMenu.value);
  showPlusMenu.value = !showPlusMenu.value;
  showQuickMode.value = false;
  showMoreMenu.value = false;
  console.log("切换后状态:", showPlusMenu.value);
};

const handlePlusMenuAction = (item) => {
  console.log(`📎 选择功能: ${item.name}`);
  showPlusMenu.value = false;

  // 添加到脚本记录
  scripts.value.unshift({
    time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
    text: `[上传] ${item.name}`,
  });

  // 模拟文件上传
  if (["file", "cloud", "code"].includes(item.id)) {
    uploadedFiles.value.push({
      name: `示例文件.${item.id === "code" ? "js" : "png"}`,
      icon: item.icon,
    });
  }
};

// 快速模式控制
const toggleQuickMode = () => {
  console.log("=== 快速模式点击 ===");
  console.log("当前状态:", showQuickMode.value);
  showQuickMode.value = !showQuickMode.value;
  showPlusMenu.value = false;
  showMoreMenu.value = false;
  console.log("切换后状态:", showQuickMode.value);
};

const selectQuickMode = (mode) => {
  currentQuickMode.value = mode;
  showQuickMode.value = false;
  console.log(`⚡ 切换模式: ${quickModeOptions[mode].label}`);

  scripts.value.unshift({
    time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
    text: `[模式切换] ${quickModeOptions[mode].label} - ${quickModeOptions[mode].desc}`,
  });
};

// 更多菜单控制
const toggleMoreMenu = () => {
  console.log("=== 更多菜单点击 ===");
  console.log("当前状态:", showMoreMenu.value);
  showMoreMenu.value = !showMoreMenu.value;
  showPlusMenu.value = false;
  showQuickMode.value = false;
  console.log("切换后状态:", showMoreMenu.value);
};

const handleMoreMenuAction = (item) => {
  console.log(`📋 选择功能: ${item.name}`);
  showMoreMenu.value = false;

  scripts.value.unshift({
    time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
    text: `[扩展功能] ${item.name} - ${item.desc}`,
  });
};

// 功能按钮点击
const handleFunctionClick = (btn) => {
  activeFunction.value = activeFunction.value === btn.id ? "" : btn.id;
  console.log(`🎯 功能按钮: ${btn.name}`);

  scripts.value.unshift({
    time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
    text: `[快捷功能] ${btn.name}`,
  });
};

// 移除上传的文件
const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1);
};

// 快捷功能方法
const quickAction = (type) => {
  const actionMap = {
    qa: "问答",
    create: "创作",
    translate: "翻译",
  };
  console.log(`⚡ 快速功能: ${actionMap[type]}`);

  // 添加到脚本记录
  scripts.value.unshift({
    time: new Date().toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    text: `[快速功能] ${actionMap[type]}`,
  });
};

// 模块入口方法
const openModule = (moduleId) => {
  const moduleNames = {
    "3d-config": "3D配置",
    "memory-manage": "记忆管理",
    "openclaw-skills": "OpenClaw技能",
  };
  console.log(`📦 打开模块: ${moduleNames[moduleId]}`);

  // 添加到脚本记录
  scripts.value.unshift({
    time: new Date().toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    text: `[打开模块] ${moduleNames[moduleId]}`,
  });
};

// 跳转到官网首页
const goToSplash = () => {
  window.location.href = "../splash.html";
};

// 方法
const selectAgent = (agent) => {
  selectedAgent.value = agent.id;
  console.log(`🤖 切换智能体: ${agent.name} (${agent.role})`);

  // 添加到脚本
  scripts.value.unshift({
    time: new Date().toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    text: `[切换智能体] ${agent.name} - ${agent.desc}`,
  });
};

const handleAction = (action) => {
  currentAction.value = action.type;
  currentAnimation.value = action.animation;

  // 调用数字人组件动画控制函数（会在组件内部 console.log + 通过事件回显到右侧面板）
  digitalHumanRef.value?.playAnimation?.(action.animation);

  setTimeout(() => {
    currentAction.value = "";
    currentAnimation.value = "idle";
  }, 2000);
};

const handlePlayAnimationEcho = (message) => {
  scripts.value.unshift({
    time: new Date().toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    text: message,
  });
};

const selectVoiceStyle = (style) => {
  currentVoiceStyle.value = style.type;
};

const selectVoice = (voice) => {
  selectedVoice.value = voice.id;
};

const handleSend = () => {
  if (!inputText.value.trim()) return;

  // 构建发送信息（包含模式）
  const modePrefix = currentQuickMode.value !== "quick" ? `[${quickModeOptions[currentQuickMode.value].label}] ` : "";
  const fileInfo = uploadedFiles.value.length > 0
    ? `[附件: ${uploadedFiles.value.map(f => f.name).join(", ")}] `
    : "";

  // 添加到脚本
  scripts.value.unshift({
    time: new Date().toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    text: fileInfo + modePrefix + inputText.value,
  });

  // 清空上传的文件
  uploadedFiles.value = [];

  // 语音播报（通过 WebSocket echo 测试）
  const voiceName = getSelectedVoiceName();
  const text = inputText.value;

  const s = initSocket();

  // 未连上时：短暂等待 connect，失败则回退本地播报，避免空白/报错
  if (!s.connected) {
    console.warn("[WS] socket not connected yet, wait a moment...");

    s.once("connect", () => {
      console.log("[WS] connected (after wait), emit speak", { text, voiceName });
      s.emit("speak", { text, voiceName });
    });

    setTimeout(() => {
      if (!s.connected) {
        console.warn("[WS] still not connected, fallback to local speakText()");
        speakText(text, voiceName);
      }
    }, 1200);

    inputText.value = "";
    return;
  }

  console.log("[WS] emit speak", { text, voiceName });
  s.emit("speak", { text, voiceName });
  inputText.value = "";
};

onUnmounted(() => {
  socket.value?.disconnect?.();
  socket.value = null;
  // 清理语音识别资源
  if (speechRecognition.value) {
    try {
      speechRecognition.value.stop();
    } catch (e) {
      // 忽略
    }
    speechRecognition.value = null;
  }
});
</script>

<style>
/* 主文案渐变文字：用青/绿/金，减少紫色“AI味” */
.ai-main-gradient-text {
  background: linear-gradient(
    90deg,
    rgb(0, 240, 255) 0%,
    rgb(124, 255, 178) 45%,
    rgb(255, 215, 0) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* 副标题稍微柔和一些 */
.ai-subtitle {
  filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.22));
}

/* 隐藏滚动条但保留功能 */
aside::-webkit-scrollbar {
  width: 4px;
}

aside::-webkit-scrollbar-track {
  background: transparent;
}

aside::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}
</style>
