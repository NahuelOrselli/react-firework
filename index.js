import React, { useEffect, useState } from "react"
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
    <div 
      className="container-particle"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="firework-canvas"
      />
    </div>
  )
}

export function RandomFirework({ 
  playExploud, 
  amountRandom = 3,
  width = 300,
  height = 300 
}) {
  const [triggers, setTriggers] = useState([])

  useEffect(() => {
    if (!playExploud) return

    console.log("react-firework: RandomFirework triggered")
    const newTriggers = []
    
    // Generate random firework configurations
    for (let i = 0; i < amountRandom; i++) {
      newTriggers.push({
        id: Date.now() + i,
        delay: i * 600, // Stagger by 600ms
        play: false
      })
    }
    
    setTriggers(newTriggers)

    // Trigger each firework with delay
    newTriggers.forEach((trigger, index) => {
      setTimeout(() => {
        setTriggers(prev => 
          prev.map(t => 
            t.id === trigger.id ? { ...t, play: true } : t
          )
        )
        
        // Reset after animation
        setTimeout(() => {
          setTriggers(prev => 
            prev.map(t => 
              t.id === trigger.id ? { ...t, play: false } : t
            )
          )
        }, 100)
      }, trigger.delay)
    })

    // Cleanup
    return () => {
      setTriggers([])
    }
  }, [playExploud, amountRandom])

  const allColors = ["red", "blue", "orange", "yellow", "pink", "white", "#ff4444", "#44ff44", "#4444ff", "#ffdd55"]

  return (
    <div 
      className="container-particle"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {triggers.map((trigger) => {
        // Random configuration for each firework
        const randomColors = Array.from(
          { length: 3 }, 
          () => allColors[Math.floor(Math.random() * allColors.length)]
        )
        const randomAmount = Math.floor(Math.random() * 100) + 80 // 80-180
        const randomMaxRadius = Math.random() * 2 + 2 // 2-4
        const randomMaxTime = Math.random() * 1 + 1 // 1-2
        
        return (
          <div 
            key={trigger.id}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Firework
              playExploud={trigger.play}
              amount={randomAmount}
              colors={randomColors}
              width={width}
              height={height}
              maxRadius={randomMaxRadius}
              maxTime={randomMaxTime}
              gravity={0.0004}
            />
          </div>
        )
      })}
    </div>
  )
}
