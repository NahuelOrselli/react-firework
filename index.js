import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './Particle.css'
import { useParticle } from './useParticle'

export default function Particle({
    amount,
    color,
    dropShadow,
    maxWidth,
    maxHeight,
    maxDistanceX,
    maxDistanceY,
    maxTime,
    playExploud
  }) {

    const [active, setActive] = useState(false)

    const particles = useParticle({
      amount,
      color,
      dropShadow,
      maxDistanceX,
      maxDistanceY,
      maxHeight,
      maxWidth,
      maxTime
    })

    useEffect(() => {
      if(playExploud === true){
        setActive(true)
        setTimeout(() => {
          setActive(false)
        },2000)
      }
    },[playExploud])
    

    return (
    <>
    <div className='container-particle'>
      {
        particles && particles.map((particle, index) => (
          <>
          <span key={index} className={active === false ? (`span-particle span-props-${particle.id}`):(`span-particle span-props-${particle.id} span-fly-${particle.id}`)}></span>
          <style jsx>
            {`
              .span-props-${particle.id}{
                width: ${particle.width};
                height: ${particle.height};
                background-color: ${particle.color};
                top: 0px;
                left: 0px;
                box-shadow: ${particle.dropShadow === false ? ('none') : (`1px 1px 3px ${particle.color} , -1px -1px 3px ${particle.color};`)} 
              }

              @keyframes fly-${particle.id}{
                0%{
                  top: 0px;
                  left: 0px;
                  opacity: 1;
                  display: block;
                }
            
                100%{
                    top: ${particle.finalPosY};
                    left: ${particle.finalPosX};
                    display: none;
                    opacity: 0;
                }
            }

              .span-fly-${particle.id}{
                animation: fly-${particle.id} ${particle.time}s ease-out forwards;
              }
            `}
          </style>
          </>
         )
        )
      }
    </div>
    </>
  )
}
