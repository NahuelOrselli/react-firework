# React Firework

---
### Table of Contents

- [Description](#description)
- [How To Use](#how-to-use)
- [Find a Bug?](#find-a-bug?)
- [License](#license)
- [Author Info](#author-info)

## Description
This is a component to generate a fireworks animation, you will change the custom parameters to get the effect you prefer.

---

## How to Use

#### Installation

````html
    npm i react-firework
````

#### Import

````html
    import Firework from 'react-firework'
````
**Note: You can use the name you prefer.**

#### Add to your code

````html
    <Firework />
````

#### Variables and Params

* `amount`: The amount of particles to be exploded in the fireworks. `Default = 80`
* `color`: The color of particles. You must pass text as param. You can pass RGB, HEX, HSL, HWB or Text. For Example: 'rgb(0,0,255)', '#0000ff', 'hsl(240,100%,50%)', 'hwb(240,0,0)', or 'blue'. `Default = red`
* `dropShadow`: You can set the drop shadow to `true` or turn it off with `false`. `Default= false`
* `maxWidth`: This is the maximum width value that the particle can have. Small recomended. `Default= 8`
* `maxHeight`: This is the maximum height value that the particle can have. Small recomended. `Default= 8`
* `maxDistanceX`: This is the maximum distance in X that the particle can travel. `Default= 80`
* `maxDistanceY`: This is the maximum distance in Y that the particle can travel.  `Default= 80`
* `maxTime`: This is the maximum time for the animation. `Default = 3`
* `playExploud`: Required `true` for generete the exploud, and `false` for reset the animation. `Default= false`

#### Example Code

````html
import "./styles.css";
import Firework from "react-firework";
import { useState } from "react";

export default function App() {
  const [play, setPlay] = useState(false);
  const handleClick = () => {
    setPlay(true);
    setTimeout(() => {
      setPlay(false);
    }, 1000);
  };
  return (
    <div className="App">
      <h1>React Firework</h1>
      <button onClick={handleClick}>
        <Firework
          amount={250}
          color={'orange'}
          dropShadow={true}
          maxHeight={5}
          maxWidth={5}
          maxDistanceX={300}
          maxDistanceY={300}
          maxTime={4}
          playExploud={play}
        />
        Play
      </button>
    </div>
  );
}
````

Code in [CodeSanbox](https://codesandbox.io/s/mystifying-lena-zcoecg?file=/src/App.js)

[Back To The Top](#react-firework)

---

## Find a bug?

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