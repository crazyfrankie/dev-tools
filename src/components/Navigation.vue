<template>
  <nav class="navigation">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">
        <span class="title-text title-glow">Dev-Tools</span>
      </router-link>
      
      <div class="nav-links">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/string-generator" class="nav-link">随机字符串</router-link>
        <router-link to="/json-parser" class="nav-link">JSON解析</router-link>
        <router-link to="/base64-tool" class="nav-link">Base64工具</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>

<style scoped>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--glass-border);
  transition: all 0.3s ease;
}

.light-theme .navigation {
  background: rgba(255, 255, 255, 0.9);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--text-primary);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--accent-primary);
  background: rgba(139, 92, 246, 0.1);
}

.nav-link.router-link-active {
  color: var(--accent-primary);
  background: rgba(139, 92, 246, 0.2);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent-gradient);
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .nav-link {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}
</style>