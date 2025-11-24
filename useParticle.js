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
      const centerX = width / 2
      const centerY = height / 2
      const next = particlesRef.current.slice()

      for (let i = 0; i < amount; i++) {
        const angle = Math.random() * 2 * Math.PI
        const speed = Math.random() * 0.3 + 0.05
        const life = (Math.random() * (maxTime - 0.3) + 0.3) * 1000
        const color = Array.isArray(colors)
          ? colors[Math.floor(Math.random() * colors.length)]
          : colors

        next.push({
          x: centerX,
          y: centerY,
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
  }, [amount, maxRadius, maxTime, colors, width, height, gravity])

  const shoot = useCallback(() => {
    if (shootRef.current) shootRef.current()
  }, [])

  return { canvasRef, shoot }
}
