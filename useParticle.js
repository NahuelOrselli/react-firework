import { useEffect, useRef, useCallback } from "react"

export function useParticle({
  amount = 80,
  maxRadius = 3,
  maxTime = 1.5,
  colors = ["red", "orange", "yellow"],
  width = 300,
  height = 300,
  gravity = 0.0004
}) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const shootRef = useRef(null)

  // Keep refs in sync with props
  const propsRef = useRef({ amount, maxRadius, maxTime, colors, gravity })
  useEffect(() => {
    propsRef.current = { amount, maxRadius, maxTime, colors, gravity }
  }, [amount, maxRadius, maxTime, colors, gravity])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    let animationId = null
    let lastTime = 0

    const loop = (time) => {
      if (!lastTime) lastTime = time
      const delta = time - lastTime
      lastTime = time

      const particles = particlesRef.current
      if (!particles.length) {
        animationId = null
        return
      }

      ctx.clearRect(0, 0, width, height)
      const alive = []
      const { gravity } = propsRef.current

      for (const particle of particles) {
        particle.age += delta
        if (particle.age >= particle.life) continue

        particle.x += particle.vx * delta
        particle.y += particle.vy * delta + gravity * delta * delta * 0.5
        particle.vy += gravity * delta

        const alpha = 1 - particle.age / particle.life
        ctx.globalAlpha = alpha
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()

        alive.push(particle)
      }

      particlesRef.current = alive

      if (alive.length) {
        animationId = requestAnimationFrame(loop)
      } else {
        animationId = null
      }
    }

    shootRef.current = () => {
      const { amount, maxRadius, maxTime, colors } = propsRef.current
      const centerX = width / 2
      const centerY = height / 2
      const next = particlesRef.current.slice()

      for (let i = 0; i < amount; i++) {
        const angle = Math.random() * 2 * Math.PI
        
        // 12% of particles are "center fill" particles that move slowly
        const isCenterParticle = Math.random() < 0.12
        
        let speed, life, startOffset
        
        if (isCenterParticle) {
          // Slow particles that stay near center
          speed = Math.random() * 0.08 + 0.01 // Very slow: 0.01 to 0.09
          life = (Math.random() * 0.5 + 0.8) * 1000 // Live longer: 0.8-1.3s
          startOffset = Math.random() * 1 // Start very close to center
        } else {
          // Fast particles that create the outer burst
          const speedVariation = Math.pow(Math.random(), 0.7) // Bias towards higher speeds
          speed = speedVariation * 0.5 + 0.1 // Range: 0.1 to 0.6
          
          // Vary particle lifetime more dramatically
          const lifeVariation = Math.random()
          life = (lifeVariation * (maxTime - 0.5) + 0.5) * 1000
          
          startOffset = Math.random() * 2 // Start slightly offset
        }
        
        const color = Array.isArray(colors)
          ? colors[Math.floor(Math.random() * colors.length)]
          : colors

        // Add slight randomness to starting position to avoid perfect center
        const offsetAngle = Math.random() * 2 * Math.PI
        
        next.push({
          x: centerX + Math.cos(offsetAngle) * startOffset,
          y: centerY + Math.sin(offsetAngle) * startOffset,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          age: 0,
          life,
          radius: Math.random() * (maxRadius - 1) + 1,
          color
        })
      }

      particlesRef.current = next

      if (!animationId) {
        lastTime = 0
        animationId = requestAnimationFrame(loop)
      }
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      particlesRef.current = []
    }
  }, [width, height]) // Only re-run if canvas size changes

  const shoot = useCallback(() => {
    if (shootRef.current) shootRef.current()
  }, [])

  return { canvasRef, shoot }
}
