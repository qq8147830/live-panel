import { defineConfig, presetUno, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      cdn: 'https://esm.sh/',
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      }
    })
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ],
  theme: {
    colors: {
      primary: '#00f0ff',
      secondary: '#7c3aed',
      accent: '#f43f5e',
      dark: {
        bg: '#0a0e27',
        card: 'rgba(26, 31, 58, 0.8)',
        border: 'rgba(255, 255, 255, 0.1)'
      }
    },
    animation: {
      'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      'scan-line': 'scan-line 3s linear infinite',
      'float': 'float 3s ease-in-out infinite',
      'rotate-slow': 'rotate-slow 20s linear infinite'
    },
    keyframes: {
      'pulse-glow': {
        '0%, 100%': { opacity: '1', transform: 'scale(1)' },
        '50%': { opacity: '0.8', transform: 'scale(1.05)' }
      },
      'scan-line': {
        '0%': { top: '0%' },
        '100%': { top: '100%' }
      },
      'float': {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-10px)' }
      },
      'rotate-slow': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
      }
    }
  },
  shortcuts: {
    'glass': 'backdrop-blur-xl bg-dark-card border border-dark-border',
    'glass-hover': 'hover:bg-white/10 transition-all duration-300',
    'neon-text': 'text-primary drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]',
    'neon-border': 'border-primary/50 shadow-[0_0_15px_rgba(0,240,255,0.3)]',
    'card-base': 'glass rounded-2xl p-6'
  }
})
