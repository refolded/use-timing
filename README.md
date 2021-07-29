# use-timing

> Modular React hooks for working with JavaScript timing functions.

## Install

```bash
npm install --save use-timing
```

or with yarn

```bash
yarn add use-timing
```

## Usage

### useInterval

```jsx
import React, { useState } from 'react'
import { useInterval } from 'use-timing'

const App = () => {
  // Classic example with a counter
  const [count, setCount] = useState(0)

  // Set a dynamic delay, you can also pass an absolute value.
  const [delay, setDelay] = useState(500)

  // The hooks return "start" and "stop" functions for controlling it.
  // Whenever the delay changes, the function dynamically reruns.
  const [start, stop] = useInterval(() => {
    setCount(count - 1)
  }, delay)

  // Examples for changing the speed on the fly.
  const halfSpeed = () => setDelay(delay * 2)
  const doubleSpeed = () => setDelay(delay / 2)

  return (
    <div>
      <h1>{count}</h1>
      <div>
        <button
          onClick={start}
        >
          Start Count
        </button>
        <button
          onClick={stop}
        >
          Stop Count
        </button>
        <button
          onClick={doubleSpeed}
        >
          Double speed
        </button>
        <button
          onClick={halfSpeed}
        >
          Half speed
        </button>
      </div>
    </div>
  )
}
```

### useTimeout
Same API as useInterval, but only runs once instead of continuously.

## License

MIT © [refolded](https://github.com/refolded)
