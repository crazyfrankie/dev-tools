<template>
  <div class="theme-toggle">
    <div class="toggle-container">
      <div class="sun-icon">☀️</div>
      <button 
        :class="['toggle-switch', { dark: isDark }]"
        @click="toggleTheme"
      >
        <div class="toggle-thumb"></div>
      </button>
      <div class="moon-icon">🌙</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemeToggle',
  data() {
    return {
      isDark: true
    }
  },
  mounted() {
    // 从localStorage读取主题设置
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      this.isDark = savedTheme === 'dark'
    } else {
      // 默认检查系统偏好
      this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    this.applyTheme()
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark
      this.applyTheme()
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
      this.$emit('theme-changed', this.isDark ? 'dark' : 'light')
    },
    
    applyTheme() {
      if (this.isDark) {
        document.documentElement.classList.add('dark-theme')
        document.documentElement.classList.remove('light-theme')
      } else {
        document.documentElement.classList.add('light-theme')
        document.documentElement.classList.remove('dark-theme')
      }
    }
  }
}
</script>

<style scoped>
.theme-toggle {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
}

.toggle-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  transition: all 0.3s ease;
}

.sun-icon, .moon-icon {
  font-size: 1.2rem;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.toggle-switch {
  position: relative;
  width: 50px;
  height: 26px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 13px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-switch.dark {
  background: linear-gradient(45deg, #8B5CF6, #3B82F6);
}

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 22px;
  height: 22px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-switch.dark .toggle-thumb {
  transform: translateX(24px);
}

@media (max-width: 768px) {
  .theme-toggle {
    top: 1rem;
    right: 1rem;
  }
  
  .toggle-container {
    padding: 0.4rem;
  }
  
  .sun-icon, .moon-icon {
    font-size: 1rem;
  }
}
</style>