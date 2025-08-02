<template>
  <div id="app">
    <ParticleBackground />
    <NavigationBar />
    <ThemeToggle @theme-changed="handleThemeChange" />
    <router-view />
  </div>
</template>

<script>
import NavigationBar from './components/Navigation.vue'
import ParticleBackground from './components/ParticleBackground.vue'
import ThemeToggle from './components/ThemeToggle.vue'

export default {
  name: 'App',
  components: {
    NavigationBar,
    ParticleBackground,
    ThemeToggle
  },
  methods: {
    handleThemeChange(theme) {
      // 可以在这里处理主题变化的逻辑
      console.log('Theme changed to:', theme)
    }
  }
}
</script>

<style>
:root {
  /* 暗色主题 */
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
  --accent-primary: #8B5CF6;
  --accent-secondary: #3B82F6;
  --accent-gradient: linear-gradient(45deg, #8B5CF6, #3B82F6);
  --title-gradient: linear-gradient(135deg, #e2e8f0, #94a3b8);
  --title-glow: rgba(226, 232, 240, 0.3);
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  --shadow-color: rgba(0, 0, 0, 0.3);
}

.light-theme {
  /* 亮色主题 */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1a1a1a;
  --text-secondary: #64748b;
  --accent-primary: #8B5CF6;
  --accent-secondary: #3B82F6;
  --accent-gradient: linear-gradient(45deg, #8B5CF6, #3B82F6);
  --title-gradient: linear-gradient(135deg, #334155, #475569);
  --title-glow: rgba(51, 65, 85, 0.2);
  --glass-bg: rgba(255, 255, 255, 0.8);
  --glass-border: rgba(139, 92, 246, 0.2);
  --shadow-color: rgba(139, 92, 246, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  overflow-x: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

#app {
  min-height: 100vh;
  position: relative;
}

/* 全局样式 */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px var(--shadow-color);
  transition: all 0.3s ease;
}

.neon-button {
  background: var(--accent-gradient);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: #ffffff;
  font-weight: bold;
  font-family: inherit;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.neon-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.3);
}

.neon-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.neon-button:hover::before {
  left: 100%;
}

.terminal-text {
  font-family: 'Fira Code', monospace;
  color: var(--accent-primary);
}

.glow-text {
  text-shadow: 0 0 10px var(--accent-primary), 0 0 20px var(--accent-primary), 0 0 30px var(--accent-primary);
}

.title-text {
  background: var(--title-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Fira Code', monospace;
}

.title-glow {
  text-shadow: 0 0 20px var(--title-glow), 0 0 40px var(--title-glow);
}
</style>
