<template>
  <div class="base64-tool">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title title-text title-glow">Base64 工具</h1>
        <p class="page-subtitle">快速编码和解码Base64字符串</p>
      </div>
      
      <div class="tool-content">
        <div class="encode-panel glass-card">
          <div class="panel-header">
            <h3 class="panel-title">编码 (Encode)</h3>
            <div class="panel-actions">
              <button @click="clearEncode" class="action-btn">清空</button>
              <button @click="copyEncoded" class="action-btn">
                <span v-if="encodeCopied">已复制</span>
                <span v-else>复制</span>
              </button>
            </div>
          </div>
          
          <div class="input-section">
            <label class="input-label">原始文本</label>
            <textarea
              v-model="plainText"
              @input="encodeText"
              placeholder="输入要编码的文本..."
              class="text-input"
            ></textarea>
          </div>
          
          <div class="output-section">
            <label class="input-label">Base64 结果</label>
            <textarea
              v-model="encodedText"
              readonly
              placeholder="编码结果将在此显示..."
              class="text-output"
            ></textarea>
          </div>
          
          <div class="info-section">
            <div class="info-item">
              <span class="info-label">原始长度:</span>
              <span class="info-value">{{ plainText.length }} 字符</span>
            </div>
            <div class="info-item">
              <span class="info-label">编码长度:</span>
              <span class="info-value">{{ encodedText.length }} 字符</span>
            </div>
          </div>
        </div>
        
        <div class="decode-panel glass-card">
          <div class="panel-header">
            <h3 class="panel-title">解码 (Decode)</h3>
            <div class="panel-actions">
              <button @click="clearDecode" class="action-btn">清空</button>
              <button @click="copyDecoded" class="action-btn">
                <span v-if="decodeCopied">已复制</span>
                <span v-else>复制</span>
              </button>
            </div>
          </div>
          
          <div class="input-section">
            <label class="input-label">Base64 文本</label>
            <textarea
              v-model="base64Text"
              @input="decodeText"
              placeholder="输入要解码的Base64文本..."
              class="text-input"
            ></textarea>
          </div>
          
          <div class="output-section">
            <label class="input-label">解码结果</label>
            <textarea
              v-model="decodedText"
              readonly
              placeholder="解码结果将在此显示..."
              class="text-output"
              :class="{ error: decodeError }"
            ></textarea>
          </div>
          
          <div v-if="decodeError" class="error-message">
            <span class="error-icon">❌</span>
            {{ decodeError }}
          </div>
          
          <div v-else class="info-section">
            <div class="info-item">
              <span class="info-label">Base64长度:</span>
              <span class="info-value">{{ base64Text.length }} 字符</span>
            </div>
            <div class="info-item">
              <span class="info-label">解码长度:</span>
              <span class="info-value">{{ decodedText.length }} 字符</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="file-section glass-card">
        <h3 class="panel-title">文件处理</h3>
        
        <div class="file-operations">
          <div class="file-encode">
            <h4>文件编码</h4>
            <div class="file-input-wrapper">
              <input
                type="file"
                ref="fileInput"
                @change="handleFileSelect"
                class="file-input"
                id="file-input"
              />
              <label for="file-input" class="file-input-label neon-button">
                选择文件
              </label>
            </div>
            
            <div v-if="selectedFile" class="file-info">
              <div class="file-details">
                <span class="file-name">{{ selectedFile.name }}</span>
                <span class="file-size">{{ formatFileSize(selectedFile.size) }}</span>
              </div>
              <button @click="encodeFile" class="encode-file-btn neon-button">
                编码文件
              </button>
            </div>
            
            <div v-if="fileBase64" class="file-result">
              <label class="input-label">文件Base64编码</label>
              <textarea
                v-model="fileBase64"
                readonly
                class="file-output"
              ></textarea>
              <div class="file-actions">
                <button @click="copyFileBase64" class="action-btn">
                  <span v-if="fileCopied">已复制</span>
                  <span v-else>复制</span>
                </button>
                <button @click="downloadBase64" class="action-btn">
                  下载
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Base64ToolPage',
  data() {
    return {
      plainText: '',
      encodedText: '',
      base64Text: '',
      decodedText: '',
      decodeError: null,
      encodeCopied: false,
      decodeCopied: false,
      fileCopied: false,
      selectedFile: null,
      fileBase64: ''
    }
  },
  methods: {
    encodeText() {
      try {
        this.encodedText = btoa(unescape(encodeURIComponent(this.plainText)))
      } catch (error) {
        this.encodedText = ''
      }
    },
    
    decodeText() {
      if (!this.base64Text.trim()) {
        this.decodedText = ''
        this.decodeError = null
        return
      }
      
      try {
        this.decodedText = decodeURIComponent(escape(atob(this.base64Text)))
        this.decodeError = null
      } catch (error) {
        this.decodedText = ''
        this.decodeError = '无效的Base64格式'
      }
    },
    
    clearEncode() {
      this.plainText = ''
      this.encodedText = ''
    },
    
    clearDecode() {
      this.base64Text = ''
      this.decodedText = ''
      this.decodeError = null
    },
    
    async copyEncoded() {
      if (!this.encodedText) return
      
      try {
        await navigator.clipboard.writeText(this.encodedText)
        this.encodeCopied = true
        setTimeout(() => {
          this.encodeCopied = false
        }, 2000)
      } catch (err) {
        console.error('复制失败:', err)
      }
    },
    
    async copyDecoded() {
      if (!this.decodedText) return
      
      try {
        await navigator.clipboard.writeText(this.decodedText)
        this.decodeCopied = true
        setTimeout(() => {
          this.decodeCopied = false
        }, 2000)
      } catch (err) {
        console.error('复制失败:', err)
      }
    },
    
    handleFileSelect(event) {
      const file = event.target.files[0]
      if (file) {
        this.selectedFile = file
        this.fileBase64 = ''
      }
    },
    
    encodeFile() {
      if (!this.selectedFile) return
      
      const reader = new FileReader()
      reader.onload = (e) => {
        this.fileBase64 = e.target.result.split(',')[1] // 移除data:xxx;base64,前缀
      }
      reader.readAsDataURL(this.selectedFile)
    },
    
    async copyFileBase64() {
      if (!this.fileBase64) return
      
      try {
        await navigator.clipboard.writeText(this.fileBase64)
        this.fileCopied = true
        setTimeout(() => {
          this.fileCopied = false
        }, 2000)
      } catch (err) {
        console.error('复制失败:', err)
      }
    },
    
    downloadBase64() {
      if (!this.fileBase64) return
      
      const blob = new Blob([this.fileBase64], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${this.selectedFile.name}.base64.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    },
    
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }
  }
}
</script>

<style scoped>
.base64-tool {
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

.tool-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
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

.action-btn:hover {
  background: rgba(139, 92, 246, 0.1);
}

.input-section, .output-section {
  margin-bottom: 1.5rem;
}

.input-label {
  display: block;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.text-input, .text-output {
  width: 100%;
  height: 120px;
  padding: 1rem;
  border: 2px solid var(--glass-border);
  border-radius: 8px;
  background: var(--glass-bg);
  color: var(--text-primary);
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  resize: vertical;
  outline: none;
}

.text-input:focus {
  border-color: var(--accent-primary);
}

.text-output {
  background: rgba(139, 92, 246, 0.05);
  border-color: rgba(139, 92, 246, 0.3);
}

.text-output.error {
  border-color: rgba(255, 107, 107, 0.5);
  background: rgba(255, 107, 107, 0.05);
}

.text-input::placeholder, .text-output::placeholder {
  color: #666;
}

.info-section {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(139, 92, 246, 0.2);
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.info-value {
  color: var(--accent-primary);
  font-weight: bold;
}

.error-message {
  color: #ff6b6b;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.file-section {
  margin-top: 2rem;
}

.file-operations {
  margin-top: 1.5rem;
}

.file-encode h4 {
  color: var(--accent-primary);
  margin-bottom: 1rem;
}

.file-input-wrapper {
  margin-bottom: 1rem;
}

.file-input {
  display: none;
}

.file-input-label {
  display: inline-block;
  cursor: pointer;
}

.file-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;
}

.file-details {
  display: flex;
  flex-direction: column;
}

.file-name {
  color: var(--text-primary);
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.file-size {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.encode-file-btn {
  padding: 0.5rem 1rem;
}

.file-result {
  margin-top: 1rem;
}

.file-output {
  width: 100%;
  height: 150px;
  padding: 1rem;
  border: 2px solid rgba(139, 92, 246, 0.3);
  border-radius: 8px;
  background: rgba(139, 92, 246, 0.05);
  color: var(--text-primary);
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  line-height: 1.4;
  resize: vertical;
  outline: none;
}

.file-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .tool-content {
    grid-template-columns: 1fr;
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
  
  .info-section {
    flex-direction: column;
    gap: 1rem;
  }
  
  .file-info {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .file-actions {
    justify-content: center;
  }
}
</style>