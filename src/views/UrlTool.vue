<template>
    <div class="url-tool">
        <div class="container">
            <div class="page-header">
                <h1 class="page-title title-text title-glow">URL 编码解码工具</h1>
                <p class="page-subtitle">快速进行URL编码和解码操作</p>
            </div>

            <div class="tool-content">
                <div class="encode-panel glass-card">
                    <div class="panel-header">
                        <h3 class="panel-title">URL 编码 (Encode)</h3>
                        <div class="panel-actions">
                            <button @click="clearEncode" class="action-btn">清空</button>
                            <button @click="copyEncoded" class="action-btn">
                                <span v-if="encodeCopied">已复制</span>
                                <span v-else>复制</span>
                            </button>
                        </div>
                    </div>

                    <div class="input-section">
                        <label class="input-label">原始URL</label>
                        <textarea v-model="originalUrl" @input="encodeUrl" placeholder="输入要编码的URL或文本..."
                            class="text-input"></textarea>
                    </div>

                    <div class="output-section">
                        <label class="input-label">编码结果</label>
                        <textarea v-model="encodedUrl" readonly placeholder="编码结果将在此显示..."
                            class="text-output"></textarea>
                    </div>

                    <div class="info-section">
                        <div class="info-item">
                            <span class="info-label">原始长度:</span>
                            <span class="info-value">{{ originalUrl.length }} 字符</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">编码长度:</span>
                            <span class="info-value">{{ encodedUrl.length }} 字符</span>
                        </div>
                    </div>
                </div>

                <div class="decode-panel glass-card">
                    <div class="panel-header">
                        <h3 class="panel-title">URL 解码 (Decode)</h3>
                        <div class="panel-actions">
                            <button @click="clearDecode" class="action-btn">清空</button>
                            <button @click="copyDecoded" class="action-btn">
                                <span v-if="decodeCopied">已复制</span>
                                <span v-else>复制</span>
                            </button>
                        </div>
                    </div>

                    <div class="input-section">
                        <label class="input-label">编码的URL</label>
                        <textarea v-model="encodedUrlInput" @input="decodeUrl" placeholder="输入要解码的URL..."
                            class="text-input"></textarea>
                    </div>

                    <div class="output-section">
                        <label class="input-label">解码结果</label>
                        <textarea v-model="decodedUrl" readonly placeholder="解码结果将在此显示..." class="text-output"
                            :class="{ error: decodeError }"></textarea>
                    </div>

                    <div v-if="decodeError" class="error-message">
                        <span class="error-icon">❌</span>
                        {{ decodeError }}
                    </div>

                    <div v-else class="info-section">
                        <div class="info-item">
                            <span class="info-label">编码长度:</span>
                            <span class="info-value">{{ encodedUrlInput.length }} 字符</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">解码长度:</span>
                            <span class="info-value">{{ decodedUrl.length }} 字符</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="examples-section glass-card">
                <h3 class="panel-title">常见示例</h3>

                <div class="examples-grid">
                    <div class="example-item" @click="loadExample(example)" v-for="example in examples"
                        :key="example.name">
                        <h4>{{ example.name }}</h4>
                        <div class="example-preview">
                            <div class="example-original">{{ example.original }}</div>
                            <div class="example-arrow">→</div>
                            <div class="example-encoded">{{ example.encoded }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UrlToolPage',
    data() {
        return {
            originalUrl: '',
            encodedUrl: '',
            encodedUrlInput: '',
            decodedUrl: '',
            decodeError: null,
            encodeCopied: false,
            decodeCopied: false,
            examples: [
                {
                    name: '中文URL',
                    original: 'https://example.com/搜索?q=测试',
                    encoded: 'https://example.com/%E6%90%9C%E7%B4%A2?q=%E6%B5%8B%E8%AF%95'
                },
                {
                    name: '特殊字符',
                    original: 'https://api.com/data?filter=name="John Doe"&age>25',
                    encoded: 'https://api.com/data?filter=name%3D%22John%20Doe%22%26age%3E25'
                },
                {
                    name: '空格和符号',
                    original: 'Hello World! @#$%^&*()',
                    encoded: 'Hello%20World!%20%40%23%24%25%5E%26*()'
                }
            ]
        }
    },
    methods: {
        encodeUrl() {
            try {
                this.encodedUrl = encodeURIComponent(this.originalUrl)
            } catch (error) {
                this.encodedUrl = ''
            }
        },

        decodeUrl() {
            if (!this.encodedUrlInput.trim()) {
                this.decodedUrl = ''
                this.decodeError = null
                return
            }

            try {
                this.decodedUrl = decodeURIComponent(this.encodedUrlInput)
                this.decodeError = null
            } catch (error) {
                this.decodedUrl = ''
                this.decodeError = '无效的URL编码格式'
            }
        },

        clearEncode() {
            this.originalUrl = ''
            this.encodedUrl = ''
        },

        clearDecode() {
            this.encodedUrlInput = ''
            this.decodedUrl = ''
            this.decodeError = null
        },

        async copyEncoded() {
            if (!this.encodedUrl) return

            try {
                await navigator.clipboard.writeText(this.encodedUrl)
                this.encodeCopied = true
                setTimeout(() => {
                    this.encodeCopied = false
                }, 2000)
            } catch (err) {
                console.error('复制失败:', err)
            }
        },

        async copyDecoded() {
            if (!this.decodedUrl) return

            try {
                await navigator.clipboard.writeText(this.decodedUrl)
                this.decodeCopied = true
                setTimeout(() => {
                    this.decodeCopied = false
                }, 2000)
            } catch (err) {
                console.error('复制失败:', err)
            }
        },

        loadExample(example) {
            this.originalUrl = example.original
            this.encodedUrl = example.encoded
            this.encodedUrlInput = example.encoded
            this.decodedUrl = example.original
            this.decodeError = null
        }
    }
}
</script>

<style scoped>
.url-tool {
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
    border-bottom: 1px solid var(--glass-border);
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

.input-section,
.output-section {
    margin-bottom: 1.5rem;
}

.input-label {
    display: block;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.text-input,
.text-output {
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

.text-input::placeholder,
.text-output::placeholder {
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

.examples-section {
    margin-top: 2rem;
}

.examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
}

.example-item {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.example-item:hover {
    background: rgba(139, 92, 246, 0.05);
    border-color: var(--accent-primary);
    transform: translateY(-2px);
}

.example-item h4 {
    color: var(--accent-primary);
    margin-bottom: 0.5rem;
    font-size: 1rem;
}

.example-preview {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Fira Code', monospace;
    font-size: 0.8rem;
}

.example-original {
    color: var(--text-primary);
    flex: 1;
    word-break: break-all;
}

.example-arrow {
    color: var(--accent-primary);
    font-weight: bold;
}

.example-encoded {
    color: var(--text-secondary);
    flex: 1;
    word-break: break-all;
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

    .examples-grid {
        grid-template-columns: 1fr;
    }

    .example-preview {
        flex-direction: column;
        align-items: stretch;
        gap: 0.25rem;
    }

    .example-arrow {
        text-align: center;
    }
}
</style>