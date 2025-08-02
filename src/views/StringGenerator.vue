<template>
  <div class="string-generator">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title title-text title-glow">随机字符串生成器</h1>
        <p class="page-subtitle">生成安全的随机字符串，支持多种字符组合</p>
      </div>
      
      <div class="generator-content">
        <div class="controls-panel glass-card">
          <h3 class="panel-title">生成配置</h3>
          
          <div class="control-group">
            <label class="control-label">字符类型</label>
            <div class="checkbox-group">
              <label class="checkbox-item">
                <input type="checkbox" v-model="options.numbers" />
                <span class="checkmark"></span>
                数字 (0-9)
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="options.lowercase" />
                <span class="checkmark"></span>
                小写字母 (a-z)
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="options.uppercase" />
                <span class="checkmark"></span>
                大写字母 (A-Z)
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="options.symbols" />
                <span class="checkmark"></span>
                特殊字符 (!@#$%^&*)
              </label>
            </div>
          </div>
          
          <div class="control-group">
            <label class="control-label">字符串长度</label>
            <div class="length-options">
              <button 
                v-for="length in lengthOptions" 
                :key="length"
                :class="['length-btn', { active: selectedLength === length }]"
                @click="selectedLength = length"
              >
                {{ length }}
              </button>
            </div>
          </div>
          
          <div class="control-group">
            <label class="control-label">生成数量</label>
            <input 
              type="number" 
              v-model.number="quantity" 
              min="1" 
              max="10" 
              class="quantity-input"
            />
          </div>
          
          <button 
            @click="generateStrings" 
            :disabled="!hasSelectedOptions"
            class="generate-btn neon-button"
          >
            生成字符串
          </button>
        </div>
        
        <div class="results-panel glass-card">
          <h3 class="panel-title">生成结果</h3>
          
          <div v-if="generatedStrings.length === 0" class="empty-state">
            <div class="empty-icon">🎲</div>
            <p>配置参数后点击生成按钮</p>
          </div>
          
          <div v-else class="results-list">
            <div 
              v-for="(str, index) in generatedStrings" 
              :key="index"
              class="result-item"
            >
              <div class="result-text">{{ str }}</div>
              <button @click="copyToClipboard(str)" class="copy-btn">
                <span v-if="copiedIndex === index">✓</span>
                <span v-else>📋</span>
              </button>
            </div>
          </div>
          
          <div v-if="generatedStrings.length > 0" class="results-actions">
            <button @click="copyAllToClipboard" class="copy-all-btn">
              复制全部
            </button>
            <button @click="clearResults" class="clear-btn">
              清空结果
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StringGeneratorPage',
  data() {
    return {
      options: {
        numbers: true,
        lowercase: true,
        uppercase: false,
        symbols: false
      },
      lengthOptions: [8, 16, 32, 64],
      selectedLength: 16,
      quantity: 1,
      generatedStrings: [],
      copiedIndex: -1
    }
  },
  computed: {
    hasSelectedOptions() {
      return Object.values(this.options).some(option => option)
    }
  },
  methods: {
    generateStrings() {
      if (!this.hasSelectedOptions) return
      
      const charset = this.buildCharset()
      const results = []
      
      for (let i = 0; i < this.quantity; i++) {
        let result = ''
        for (let j = 0; j < this.selectedLength; j++) {
          result += charset.charAt(Math.floor(Math.random() * charset.length))
        }
        results.push(result)
      }
      
      this.generatedStrings = results
    },
    
    buildCharset() {
      let charset = ''
      if (this.options.numbers) charset += '0123456789'
      if (this.options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
      if (this.options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      if (this.options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
      return charset
    },
    
    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text)
        const index = this.generatedStrings.indexOf(text)
        this.copiedIndex = index
        setTimeout(() => {
          this.copiedIndex = -1
        }, 2000)
      } catch (err) {
        console.error('复制失败:', err)
      }
    },
    
    async copyAllToClipboard() {
      try {
        const allText = this.generatedStrings.join('\n')
        await navigator.clipboard.writeText(allText)
        this.copiedIndex = -2 // 表示复制全部
        setTimeout(() => {
          this.copiedIndex = -1
        }, 2000)
      } catch (err) {
        console.error('复制失败:', err)
      }
    },
    
    clearResults() {
      this.generatedStrings = []
    }
  }
}
</script>

<style scoped>
.string-generator {
  min-height: 100vh;
  padding-top: 100px;
  padding-bottom: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.generator-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.panel-title {
  color: var(--accent-primary);
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.control-group {
  margin-bottom: 2rem;
}

.control-label {
  display: block;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checkbox-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.checkbox-item:hover {
  background: rgba(139, 92, 246, 0.1);
}

.checkbox-item input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid var(--accent-primary);
  border-radius: 4px;
  margin-right: 0.5rem;
  position: relative;
  transition: all 0.3s ease;
}

.checkbox-item input[type="checkbox"]:checked + .checkmark {
  background: var(--accent-primary);
}

.checkbox-item input[type="checkbox"]:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #0a0a0a;
  font-weight: bold;
}

.length-options {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.length-btn {
  padding: 0.5rem 1rem;
  border: 2px solid var(--accent-primary);
  background: transparent;
  color: var(--accent-primary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.length-btn:hover {
  background: rgba(139, 92, 246, 0.1);
}

.length-btn.active {
  background: var(--accent-primary);
  color: #ffffff;
}

.quantity-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--glass-border);
  border-radius: 8px;
  background: var(--glass-bg);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 1rem;
}

.quantity-input:focus {
  outline: none;
  border-color: var(--accent-primary);
}

.generate-btn {
  width: 100%;
  margin-top: 1rem;
}

.generate-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.results-list {
  max-height: 400px;
  overflow-y: auto;
}

.result-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.result-text {
  font-family: 'Fira Code', monospace;
  color: var(--accent-primary);
  word-break: break-all;
  flex: 1;
  margin-right: 1rem;
}

.copy-btn {
  background: transparent;
  border: 1px solid var(--accent-primary);
  color: var(--accent-primary);
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.copy-btn:hover {
  background: rgba(139, 92, 246, 0.1);
}

.results-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.copy-all-btn, .clear-btn {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid var(--accent-primary);
  background: transparent;
  color: var(--accent-primary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.copy-all-btn:hover, .clear-btn:hover {
  background: rgba(139, 92, 246, 0.1);
}

@media (max-width: 768px) {
  .generator-content {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .length-options {
    justify-content: center;
  }
}
</style>