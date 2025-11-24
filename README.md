# React Firework

---

### Table of Contents

- [Description](#description)
- [How To Use](#how-to-use)
- [Find a Bug?](#find-a-bug)
- [License](#license)
- [Author Info](#author-info)

## Description

This is a React component that generates a fireworks animation using an HTML5 canvas.  
You can customize several parameters to get the effect you prefer.

---

## How to Use

#### Installation

```bash
npm i react-firework
```

#### Import

```js
import { Firework, RandomFirework } from 'react-firework'
```

#### Add to your code

```jsx
<Firework playExploud={play} />
```

#### Variables and Params

**Firework props (canvas)**

- `playExploud`: `boolean`. Set to `true` to launch a firework explosion. When you set it back to `false` you can trigger a new launch. `Default = false`
- `amount`: `number`. Amount of particles to be exploded in the fireworks. `Default = 80`
- `colors`: `string | string[]`. Color or list of colors for the particles. You can pass RGB, HEX, HSL, HWB or text values. For example: `'rgb(0,0,255)'`, `'#0000ff'`, `'hsl(240,100%,50%)'`, `'hwb(240,0,0)'`, or `'blue'`. `Default = ["red", "orange", "yellow"]`
- `width`: `number`. Canvas width in pixels. `Default = 300`
- `height`: `number`. Canvas height in pixels. `Default = 300`
- `maxRadius`: `number`. Maximum radius (size) of each particle in pixels. `Default = 3`
- `maxTime`: `number`. Maximum life time of the particles in seconds. `Default = 1.5`
- `gravity`: `number`. Gravity factor applied to particles movement (higher values make particles fall faster). `Default = 0.0004`

**RandomFirework props**

- `playExploud`: `boolean`. When `true`, launches a sequence of random fireworks.
- `amountRandom`: `number`. How many explosions to launch in that sequence. `Default = 3`
- `width`: `number`. Canvas width in pixels. `Default = 300`
- `height`: `number`. Canvas height in pixels. `Default = 300`

#### Example Code

```jsx
import './styles.css'
import { Firework, RandomFirework } from 'react-firework'
import { useState } from 'react'

export default function App() {
  const [playSingle, setPlaySingle] = useState(false)
  const [playRandom, setPlayRandom] = useState(false)

  const handleSingle = () => {
    setPlaySingle(true)
    setTimeout(() => {
      setPlaySingle(false)
    }, 500)
  }

  const handleRandom = () => {
    setPlayRandom(true)
    setTimeout(() => {
      setPlayRandom(false)
    }, 500)
  }

  return (
    <div className='App'>
      <h1>React Firework (canvas)</h1>

      <button onClick={handleSingle}>Launch single firework</button>
      <Firework
        playExploud={playSingle}
        amount={150}
        colors={['#ffdd55', '#ff8800', '#ff4444']}
        width={400}
        height={400}
      />

      <button onClick={handleRandom}>Launch random sequence</button>
      <RandomFirework playExploud={playRandom} amountRandom={5} />
    </div>
  )
}
```

#### Fullscreen example (100% of the viewport)

If you want the firework to fill the whole screen, you can use the window size as the canvas size:

```jsx
import { useState, useEffect } from 'react'
import { Firework } from 'react-firework'

export default function FullscreenFirework() {
  const [play, setPlay] = useState(false)
  const [size, setSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  })

  useEffect(() => {
    const onResize = () => {
      setSize({
        w: window.innerWidth,
        h: window.innerHeight,
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleClick = () => {
    setPlay(true)
    setTimeout(() => setPlay(false), 500)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
      onClick={handleClick}
    >
      <Firework
        playExploud={play}
        width={size.w}
        height={size.h}
        amount={200}
        colors={['#ffffff', '#ffdd55', '#ff4444']}
      />
    </div>
  )
}
```

[Back To The Top](#react-firework)

---

## Find a bug

If you found an issue or would like to submit an improvement to this project, please submit an issue using the issues tab above. If you would like to submit a PR with a fix, reference the issue you created!

---

## License

Copyright (c) [2023] [Nahuel Orselli]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[Back To The Top](#react-firework)

---

## Author Info

Nahuel Orselli Front end Developer.

### `Follow me`

in LinkedIn as [Nahuel Orselli](https://www.linkedin.com/in/nahuel-orselli-912850236/)

in Instagram as [@nahuelorselli.jsx](https://www.instagram.com/nahuelorselli.jsx/)

in Twitter as [@OrselliNahuel](https://twitter.com/OrselliNahuel)

in GitHub [Nahuel Orselli](https://github.com/NahuelOrselli)

[Back To The Top](#react-firework)
