import { useEffect } from "react"
import { useState } from "react"

export function useParticle({
    amount = 15,
    maxWidth = 8,
    maxHeight = 8,
    maxDistanceX = 80,
    maxDistanceY = 80,
    maxTime = 3,
    color = 'red',
    dropShadow = false,  }) {

    const [particles, setParticles] = useState([])

    useEffect(()=>{
        if (amount) {
        setParticles([])
        for ( let i = 0; i < amount; i++){
            let particleObjetc = {
                id: (maxWidth * Math.round(Math.random() * (99 - 1) +1))+(maxDistanceX* Math.round(Math.random() * (99 - 1) +1)),
                color,
                dropShadow,
                time: Math.random()*(maxTime-0.5)+0.5,
                finalPosX: `${Math.ceil(Math.random() * maxDistanceX ) * (Math.round(Math.random()) ? 1 : -1)}px`,
                finalPosY: `${Math.ceil(Math.random() * maxDistanceY ) * (Math.round(Math.random()) ? 1 : -1)}px`,
                width: `${Math.floor(Math.random() * (maxWidth - 2) + 2)}px`,
                height: `${Math.floor(Math.random() * (maxHeight - 2) + 2)}px`,
            }
           setParticles(particlesPrev => particlesPrev.concat(particleObjetc))
        }
    }
    }, [amount])
  return particles
    }
