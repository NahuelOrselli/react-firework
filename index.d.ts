import * as React from "react"

export interface FireworkProps {
  playExploud?: boolean
  amount?: number
  colors?: string | string[]
  width?: number
  height?: number
  maxRadius?: number
  maxTime?: number
  gravity?: number
}

export interface RandomFireworkProps {
  playExploud?: boolean
  amountRandom?: number
}

export declare function Firework(
  props: FireworkProps
): React.ReactElement | null

export declare function RandomFirework(
  props: RandomFireworkProps
): React.ReactElement | null

