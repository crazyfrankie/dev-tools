<template>
  <canvas ref="canvas" class="particle-canvas"></canvas>
</template>

<script>
export default {
  name: 'ParticleBackground',
  data() {
    return {
      mouseX: 0,
      mouseY: 0
    }
  },
  mounted() {
    this.initParticles()
    window.addEventListener('resize', this.resizeCanvas)
    window.addEventListener('mousemove', this.handleMouseMove)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeCanvas)
    window.removeEventListener('mousemove', this.handleMouseMove)
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
  },
  methods: {
    initParticles() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      
      this.resizeCanvas()
      
      const particles = []
      const stars = []
      const meteors = []
      const pulses = []
      const particleCount = 80
      const starCount = 100
      const meteorCount = 3
      
      let time = 0
      
      // 普通粒子类
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.vx = (Math.random() - 0.5) * 0.8
          this.vy = (Math.random() - 0.5) * 0.8
          this.size = Math.random() * 3 + 1
          this.opacity = Math.random() * 0.6 + 0.2
          this.pulseSpeed = Math.random() * 0.02 + 0.01
          this.pulseOffset = Math.random() * Math.PI * 2
        }
        
        update() {
          // 鼠标引力效果
          if (this.mouseX && this.mouseY) {
            const dx = this.mouseX - this.x
            const dy = this.mouseY - this.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 200) {
              const force = (200 - distance) / 200 * 0.01
              this.vx += (dx / distance) * force
              this.vy += (dy / distance) * force
            }
          }
          
          // 速度衰减
          this.vx *= 0.99
          this.vy *= 0.99
          
          this.x += this.vx
          this.y += this.vy
          
          // 边界处理
          if (this.x < 0) this.x = canvas.width
          if (this.x > canvas.width) this.x = 0
          if (this.y < 0) this.y = canvas.height
          if (this.y > canvas.height) this.y = 0
          
          // 脉冲效果
          this.currentOpacity = this.opacity + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.3
        }
        
        draw() {
          const isDark = !document.documentElement.classList.contains('light-theme')
          const color = isDark ? '139, 92, 246' : '59, 130, 246'
          
          // 绘制光晕
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3)
          gradient.addColorStop(0, `rgba(${color}, ${this.currentOpacity})`)
          gradient.addColorStop(1, `rgba(${color}, 0)`)
          
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
          
          // 绘制核心
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${color}, ${this.currentOpacity})`
          ctx.fill()
        }
      }
      
      // 星星类
      class Star {
        constructor() {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.size = Math.random() * 1.5 + 0.5
          this.twinkleSpeed = Math.random() * 0.03 + 0.01
          this.twinkleOffset = Math.random() * Math.PI * 2
        }
        
        update() {
          this.opacity = 0.3 + Math.sin(time * this.twinkleSpeed + this.twinkleOffset) * 0.3
        }
        
        draw() {
          const isDark = !document.documentElement.classList.contains('light-theme')
          const color = isDark ? '226, 232, 240' : '100, 116, 139'
          
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${color}, ${this.opacity})`
          ctx.fill()
          
          // 十字光芒
          if (this.opacity > 0.5) {
            ctx.strokeStyle = `rgba(${color}, ${this.opacity * 0.5})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(this.x - this.size * 2, this.y)
            ctx.lineTo(this.x + this.size * 2, this.y)
            ctx.moveTo(this.x, this.y - this.size * 2)
            ctx.lineTo(this.x, this.y + this.size * 2)
            ctx.stroke()
          }
        }
      }
      
      // 流星类
      class Meteor {
        constructor() {
          this.reset()
          this.trail = []
          this.trailLength = 15
        }
        
        reset() {
          this.x = Math.random() * canvas.width
          this.y = -50
          this.vx = (Math.random() - 0.5) * 4
          this.vy = Math.random() * 3 + 2
          this.size = Math.random() * 2 + 1
          this.opacity = Math.random() * 0.8 + 0.2
          this.life = 1
        }
        
        update() {
          this.x += this.vx
          this.y += this.vy
          
          // 添加轨迹点
          this.trail.push({ x: this.x, y: this.y, opacity: this.opacity })
          if (this.trail.length > this.trailLength) {
            this.trail.shift()
          }
          
          // 生命周期
          this.life -= 0.005
          if (this.life <= 0 || this.y > canvas.height + 50) {
            this.reset()
            this.trail = []
          }
        }
        
        draw() {
          const isDark = !document.documentElement.classList.contains('light-theme')
          const color = isDark ? '139, 92, 246' : '59, 130, 246'
          
          // 绘制轨迹
          this.trail.forEach((point, index) => {
            const trailOpacity = (index / this.trail.length) * this.opacity * this.life
            ctx.beginPath()
            ctx.arc(point.x, point.y, this.size * (index / this.trail.length), 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${color}, ${trailOpacity})`
            ctx.fill()
          })
          
          // 绘制流星头部
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4)
          gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * this.life})`)
          gradient.addColorStop(0.3, `rgba(${color}, ${this.opacity * this.life})`)
          gradient.addColorStop(1, `rgba(${color}, 0)`)
          
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }
      }
      
      // 脉冲波纹类
      class Pulse {
        constructor() {
          this.reset()
        }
        
        reset() {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.radius = 0
          this.maxRadius = Math.random() * 100 + 50
          this.speed = Math.random() * 2 + 1
          this.opacity = Math.random() * 0.3 + 0.1
        }
        
        update() {
          this.radius += this.speed
          if (this.radius > this.maxRadius) {
            this.reset()
          }
        }
        
        draw() {
          const isDark = !document.documentElement.classList.contains('light-theme')
          const color = isDark ? '139, 92, 246' : '59, 130, 246'
          const currentOpacity = this.opacity * (1 - this.radius / this.maxRadius)
          
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${color}, ${currentOpacity})`
          ctx.lineWidth = 2
          ctx.stroke()
        }
      }
      
      // 初始化所有元素
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
      
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star())
      }
      
      for (let i = 0; i < meteorCount; i++) {
        meteors.push(new Meteor())
      }
      
      for (let i = 0; i < 5; i++) {
        pulses.push(new Pulse())
      }
      
      // 数据流效果
      const drawDataStream = () => {
        const isDark = !document.documentElement.classList.contains('light-theme')
        const color = isDark ? '139, 92, 246' : '59, 130, 246'
        
        // 绘制网格
        ctx.strokeStyle = `rgba(${color}, 0.03)`
        ctx.lineWidth = 0.5
        
        const gridSize = 50
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, canvas.height)
          ctx.stroke()
        }
        
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(canvas.width, y)
          ctx.stroke()
        }
        
        // 随机数据流线条
        if (Math.random() < 0.02) {
          const startX = Math.random() * canvas.width
          const startY = Math.random() * canvas.height
          const endX = startX + (Math.random() - 0.5) * 200
          const endY = startY + (Math.random() - 0.5) * 200
          
          const gradient = ctx.createLinearGradient(startX, startY, endX, endY)
          gradient.addColorStop(0, `rgba(${color}, 0)`)
          gradient.addColorStop(0.5, `rgba(${color}, 0.3)`)
          gradient.addColorStop(1, `rgba(${color}, 0)`)
          
          ctx.strokeStyle = gradient
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(startX, startY)
          ctx.lineTo(endX, endY)
          ctx.stroke()
        }
      }
      
      const animate = () => {
        time += 0.016 // 约60fps
        
        // 创建渐变背景
        const isDark = !document.documentElement.classList.contains('light-theme')
        if (isDark) {
          const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, Math.max(canvas.width, canvas.height))
          gradient.addColorStop(0, 'rgba(10, 10, 10, 0.95)')
          gradient.addColorStop(1, 'rgba(5, 5, 15, 0.98)')
          ctx.fillStyle = gradient
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // 绘制数据流网格
        drawDataStream()
        
        // 绘制星星
        stars.forEach(star => {
          star.update()
          star.draw()
        })
        
        // 绘制脉冲
        pulses.forEach(pulse => {
          pulse.update()
          pulse.draw()
        })
        
        // 绘制粒子
        particles.forEach(particle => {
          particle.mouseX = this.mouseX
          particle.mouseY = this.mouseY
          particle.update()
          particle.draw()
        })
        
        // 绘制粒子连接线（增强版）
        particles.forEach((particle, i) => {
          particles.slice(i + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 120) {
              const opacity = 0.15 * (1 - distance / 120)
              const color = isDark ? '139, 92, 246' : '59, 130, 246'
              
              // 创建渐变线条
              const gradient = ctx.createLinearGradient(particle.x, particle.y, otherParticle.x, otherParticle.y)
              gradient.addColorStop(0, `rgba(${color}, ${opacity * particle.currentOpacity})`)
              gradient.addColorStop(1, `rgba(${color}, ${opacity * otherParticle.currentOpacity})`)
              
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = gradient
              ctx.lineWidth = 1
              ctx.stroke()
            }
          })
        })
        
        // 绘制流星
        meteors.forEach(meteor => {
          meteor.update()
          meteor.draw()
        })
        
        // 鼠标交互效果
        if (this.mouseX && this.mouseY) {
          const mouseInfluenceRadius = 150
          const isDark = !document.documentElement.classList.contains('light-theme')
          const color = isDark ? '139, 92, 246' : '59, 130, 246'
          
          // 鼠标光环
          const mouseGradient = ctx.createRadialGradient(this.mouseX, this.mouseY, 0, this.mouseX, this.mouseY, mouseInfluenceRadius)
          mouseGradient.addColorStop(0, `rgba(${color}, 0.1)`)
          mouseGradient.addColorStop(0.5, `rgba(${color}, 0.05)`)
          mouseGradient.addColorStop(1, `rgba(${color}, 0)`)
          
          ctx.beginPath()
          ctx.arc(this.mouseX, this.mouseY, mouseInfluenceRadius, 0, Math.PI * 2)
          ctx.fillStyle = mouseGradient
          ctx.fill()
          
          // 鼠标附近的粒子连线
          particles.forEach(particle => {
            const dx = particle.x - this.mouseX
            const dy = particle.y - this.mouseY
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < mouseInfluenceRadius) {
              const opacity = 0.3 * (1 - distance / mouseInfluenceRadius)
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(this.mouseX, this.mouseY)
              ctx.strokeStyle = `rgba(${color}, ${opacity})`
              ctx.lineWidth = 1
              ctx.stroke()
            }
          })
        }
        
        this.animationId = requestAnimationFrame(animate)
      }
      
      animate()
    },
    
    resizeCanvas() {
      const canvas = this.$refs.canvas
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    },
    
    handleMouseMove(event) {
      this.mouseX = event.clientX
      this.mouseY = event.clientY
    }
  }
}
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
</style>