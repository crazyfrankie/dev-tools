<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="terminal-prompt">$</span>
            <span class="typing-text title-text title-glow">{{ displayText }}</span>
            <span class="cursor">|</span>
          </h1>
          
          <p class="hero-subtitle">
            专为开发者打造的实用工具集合<br>
            让开发更高效，让工作更简单
          </p>
          
          <div class="hero-features">
            <div 
              class="feature-card glass-card clickable" 
              @click="navigateToTool('/string-generator')"
            >
              <div class="feature-icon">🔤</div>
              <h3>随机字符串生成</h3>
              <p>支持多种字符组合，自定义长度和数量</p>
            </div>
            
            <div 
              class="feature-card glass-card clickable" 
              @click="navigateToTool('/json-parser')"
            >
              <div class="feature-icon">�</div>
              <h3>JSON 解析器</h3>
              <p>实时格式化和验证JSON数据</p>
            </div>
            
            <div 
              class="feature-card glass-card clickable" 
              @click="navigateToTool('/base64-tool')"
            >
              <div class="feature-icon">🔐</div>
              <h3>Base64 工具</h3>
              <p>快速编码和解码Base64字符串</p>
            </div>
            
            <div 
              class="feature-card glass-card clickable" 
              @click="navigateToTool('/url-tool')"
            >
              <div class="feature-icon">🔗</div>
              <h3>URL 编码解码</h3>
              <p>快速进行URL编码和解码操作</p>
            </div>
            
            <div class="feature-card glass-card coming-soon">
              <div class="feature-icon">🚀</div>
              <h3>更多工具</h3>
              <p>正在开发中，敬请期待...</p>
              <div class="coming-soon-badge">Coming Soon</div>
            </div>
          </div>
          
          <div class="hero-cta">
            <router-link :to="randomTool.route" class="neon-button">
              {{ randomTool.text }}
            </router-link>
          </div>
        </div>
        
        <div class="hero-visual">
          <div class="floating-code">
            <div class="code-window glass-card">
              <div class="code-header">
                <div class="code-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <span class="code-title">dev-tools.js</span>
              </div>
              <div class="code-content">
                <div class="code-line">
                  <span class="code-comment">// 开发者工具集合</span>
                </div>
                <div class="code-line">
                  <span class="code-keyword">const</span>
                  <span class="code-variable"> tools</span>
                  <span class="code-operator"> = </span>
                  <span class="code-bracket">{</span>
                </div>
                <div class="code-line code-indent">
                  <span class="code-property">stringGen</span>
                  <span class="code-operator">:</span>
                  <span class="code-string"> "随机字符串"</span>
                  <span class="code-operator">,</span>
                </div>
                <div class="code-line code-indent">
                  <span class="code-property">jsonParser</span>
                  <span class="code-operator">:</span>
                  <span class="code-string"> "JSON解析"</span>
                  <span class="code-operator">,</span>
                </div>
                <div class="code-line code-indent">
                  <span class="code-property">base64</span>
                  <span class="code-operator">:</span>
                  <span class="code-string"> "编码工具"</span>
                </div>
                <div class="code-line">
                  <span class="code-bracket">}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      displayText: '',
      fullText: 'Dev-Tools 开发者工具箱',
      typeIndex: 0,
      tools: [
        {
          name: '随机字符串生成器',
          route: '/string-generator',
          text: '从随机字符串开始吧'
        },
        {
          name: 'JSON解析器',
          route: '/json-parser',
          text: '从JSON解析开始吧'
        },
        {
          name: 'Base64工具',
          route: '/base64-tool',
          text: '从Base64工具开始吧'
        },
        {
          name: 'URL工具',
          route: '/url-tool',
          text: '从URL工具开始吧'
        }
      ],
      randomTool: {}
    }
  },
  mounted() {
    this.typeText()
    this.selectRandomTool()
  },
  methods: {
    typeText() {
      if (this.typeIndex < this.fullText.length) {
        this.displayText += this.fullText.charAt(this.typeIndex)
        this.typeIndex++
        setTimeout(this.typeText, 100)
      }
    },
    
    selectRandomTool() {
      const randomIndex = Math.floor(Math.random() * this.tools.length)
      this.randomTool = this.tools[randomIndex]
    },
    
    navigateToTool(route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  padding-top: 80px;
}

.hero {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.hero-content {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.terminal-prompt {
  color: var(--accent-primary);
  margin-right: 0.5rem;
}

.typing-text {
  font-weight: bold;
}

.cursor {
  color: var(--accent-primary);
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.hero-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.hero-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3rem;
}

.feature-card {
  text-align: center;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card.clickable {
  cursor: pointer;
}

.feature-card.clickable:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px var(--shadow-color);
}

.feature-card.clickable:hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--accent-gradient);
  opacity: 0.05;
  pointer-events: none;
}

.feature-card.coming-soon {
  opacity: 0.7;
  position: relative;
}

.coming-soon-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--accent-gradient);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.feature-card.coming-soon .feature-icon {
  animation: bounce 3s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: var(--accent-primary);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.feature-card p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
}

.hero-cta {
  text-align: center;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.floating-code {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.code-window {
  width: 400px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(100, 255, 218, 0.3);
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.code-dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27ca3f; }

.code-title {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.code-content {
  padding: 1rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

.code-line {
  margin-bottom: 0.5rem;
}

.code-indent {
  padding-left: 2rem;
}

.code-comment { color: #6a9955; }
.code-keyword { color: #569cd6; }
.code-variable { color: #9cdcfe; }
.code-operator { color: #d4d4d4; }
.code-property { color: #92c5f7; }
.code-string { color: #ce9178; }
.code-bracket { color: #ffd700; }

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-features {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .feature-card {
    padding: 1.25rem;
  }
  
  .coming-soon-badge {
    top: 0.75rem;
    right: 0.75rem;
    font-size: 0.65rem;
    padding: 0.2rem 0.4rem;
  }
  
  .code-window {
    width: 100%;
    max-width: 350px;
  }
}

@media (max-width: 480px) {
  .hero-features {
    grid-template-columns: 1fr;
  }
  
  .feature-card {
    padding: 1rem;
  }
  
  .feature-card h3 {
    font-size: 1rem;
  }
  
  .feature-card p {
    font-size: 0.85rem;
  }
}
</style>