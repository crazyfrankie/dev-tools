<template>
  <div class="json-parser">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title title-text title-glow">JSON 解析器</h1>
        <p class="page-subtitle">实时格式化、验证和美化JSON数据</p>
      </div>
      
      <div class="parser-content">
        <div class="input-panel glass-card">
          <div class="panel-header">
            <h3 class="panel-title">输入 JSON</h3>
            <div class="panel-actions">
              <button @click="clearInput" class="action-btn">清空</button>
              <button @click="formatInput" class="action-btn">格式化</button>
            </div>
          </div>
          
          <textarea
            v-model="inputJson"
            @input="parseJson"
            placeholder="在此输入或粘贴JSON数据..."
            class="json-input"
          ></textarea>
          
          <div class="input-status">
            <div v-if="parseError" class="error-message">
              <span class="error-icon">❌</span>
              {{ parseError }}
            </div>
            <div v-else-if="inputJson.trim()" class="success-message">
              <span class="success-icon">✅</span>
              JSON 格式正确
            </div>
          </div>
        </div>
        
        <div class="output-panel glass-card">
          <div class="panel-header">
            <h3 class="panel-title">格式化结果</h3>
            <div class="panel-actions">
              <button @click="copyOutput" class="action-btn">
                <span v-if="copied">已复制</span>
                <span v-else>复制</span>
              </button>
              <button @click="downloadJson" class="action-btn" :disabled="!parsedJson">
                下载
              </button>
            </div>
          </div>
          
          <div v-if="!inputJson.trim()" class="empty-state">
            <div class="empty-icon">📋</div>
            <p>在左侧输入JSON数据，右侧将实时显示格式化结果</p>
          </div>
          
          <div v-else-if="parseError" class="error-state">
            <div class="error-icon">⚠️</div>
            <p>JSON格式错误，请检查输入</p>
          </div>
          
          <pre v-else class="json-output"><code>{{ formattedJson }}</code></pre>
          
          <div v-if="parsedJson && !parseError" class="json-info">
            <div class="info-item">
              <span class="info-label">类型:</span>
              <span class="info-value">{{ jsonType }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">大小:</span>
              <span class="info-value">{{ jsonSize }} 字符</span>
            </div>
            <div v-if="jsonType === 'Object'" class="info-item">
              <span class="info-label">键数量:</span>
              <span class="info-value">{{ objectKeysCount }}</span>
            </div>
            <div v-if="jsonType === 'Array'" class="info-item">
              <span class="info-label">元素数量:</span>
              <span class="info-value">{{ arrayLength }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JsonParserPage',
  data() {
    return {
      inputJson: '',
      parsedJson: null,
      parseError: null,
      copied: false
    }
  },
  computed: {
    formattedJson() {
      if (this.parsedJson !== null) {
        return JSON.stringify(this.parsedJson, null, 2)
      }
      return ''
    },
    
    jsonType() {
      if (this.parsedJson === null) return ''
      if (Array.isArray(this.parsedJson)) return 'Array'
      if (typeof this.parsedJson === 'object') return 'Object'
      if (typeof this.parsedJson === 'string') return 'String'
      if (typeof this.parsedJson === 'number') return 'Number'
      if (typeof this.parsedJson === 'boolean') return 'Boolean'
      return 'Unknown'
    },
    
    jsonSize() {
      return this.formattedJson.length
    },
    
    objectKeysCount() {
      if (this.jsonType === 'Object') {
        return Object.keys(this.parsedJson).length
      }
      return 0
    },
    
    arrayLength() {
      if (this.jsonType === 'Array') {
        return this.parsedJson.length
      }
      return 0
    }
  },
  methods: {
    parseJson() {
      if (!this.inputJson.trim()) {
        this.parsedJson = null
        this.parseError = null
        return
      }
      
      try {
        this.parsedJson = JSON.parse(this.inputJson)
        this.parseError = null
      } catch (error) {
        this.parseError = `解析错误: ${error.message}`
        this.parsedJson = null
      }
    },
    
    clearInput() {
      this.inputJson = ''
      this.parsedJson = null
      this.parseError = null
    },
    
    formatInput() {
      if (this.parsedJson !== null) {
        this.inputJson = JSON.stringify(this.parsedJson, null, 2)
      }
    },
    
    async copyOutput() {
      if (!this.formattedJson) return
      
      try {
        await navigator.clipboard.writeText(this.formattedJson)
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 2000)
      } catch (err) {
        console.error('复制失败:', err)
      }
    },
    
    downloadJson() {
      if (!this.formattedJson) return
      
      const blob = new Blob([this.formattedJson], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'formatted.json'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }
}
</script>

<style scoped>
.json-parser {
  min-height: 100vh;
  padding-top: 100px;
  padding-bottom: 2rem;
}

.container {
  max-width: 1400px;
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

.parser-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  height: calc(100vh - 300px);
  min-height: 600px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.panel-title {
  color: var(--accent-primary);
  font-size: 1.2rem;
  margin: 0;
}

.panel-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--accent-primary);
  background: transparent;
  color: var(--accent-primary);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  font-size: 0.9rem;
}

.action-btn:hover:not(:disabled) {
  background: rgba(139, 92, 246, 0.1);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.json-input {
  width: 100%;
  height: calc(100% - 120px);
  min-height: 300px;
  padding: 1rem;
  border: 2px solid var(--glass-border);
  border-radius: 8px;
  background: var(--glass-bg);
  color: var(--text-primary);
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  resize: none;
  outline: none;
}

.json-input:focus {
  border-color: var(--accent-primary);
}

.json-input::placeholder {
  color: #666;
}

.input-status {
  margin-top: 1rem;
  min-height: 24px;
}

.error-message {
  color: #ff6b6b;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.success-message {
  color: #51cf66;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.empty-state, .error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: var(--text-secondary);
  text-align: center;
}

.empty-icon, .error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.json-output {
  width: 100%;
  height: calc(100% - 200px);
  min-height: 300px;
  padding: 1rem;
  border: 2px solid var(--glass-border);
  border-radius: 8px;
  background: var(--glass-bg);
  color: var(--text-primary);
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow: auto;
  margin: 0;
  white-space: pre-wrap;
}

.json-output code {
  color: var(--accent-primary);
}

.json-info {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(139, 92, 246, 0.2);
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  color: var(--text-secondary);
}

.info-value {
  color: var(--accent-primary);
  font-weight: bold;
}

@media (max-width: 768px) {
  .parser-content {
    grid-template-columns: 1fr;
    height: auto;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .panel-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .panel-actions {
    justify-content: center;
  }
  
  .json-input, .json-output {
    height: 300px;
  }
}
</style>