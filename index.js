import React, { useEffect } from "react"
import "./Particle.css"
import { useParticle } from "./useParticle"

export function Firework({
  playExploud,
  amount = 80,
  colors = ["red", "orange", "yellow"],
  width = 300,
  height = 300,
  maxRadius = 3,
  maxTime = 1.5,
  gravity = 0.0004
}) {
  const { canvasRef, shoot } = useParticle({
    amount,
    maxRadius,
    maxTime,
    colors,
    width,
    height,
    gravity
  })

  useEffect(() => {
    if (playExploud) {
      shoot()
    }
  }, [playExploud, shoot])

  return (
    <div className="container-particle">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="firework-canvas"
      />
    </div>
  )
}

export function RandomFirework({ playExploud, amountRandom = 3 }) {
  const colors = ["red", "blue", "orange", "yellow", "pink", "white"]
  const { canvasRef, shoot } = useParticle({
    amount: 120,
    maxRadius: 3,
    maxTime: 1.8,
    colors,
    width: 300,
    height: 300,
    gravity: 0.0004
  })

  useEffect(() => {
    if (!playExploud) return

    let count = 0
    const interval = setInterval(() => {
      shoot()
      count += 1
      if (count >= amountRandom) {
        clearInterval(interval)
      }
    }, 600)

    return () => clearInterval(interval)
  }, [playExploud, amountRandom, shoot])

  return (
    <div className="container-particle">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="firework-canvas"
      />
    </div>
  )
}
