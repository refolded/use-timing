# use-timing

> Modular React hooks for working with JavaScript timing functions.

## Install

```bash
npm install --save @refolded/use-timing
```

or with yarn

```bash
yarn add @refolded/use-timing
```

## Demo

https://use-timing.vercel.app/

## Usage

### useInterval
1:1 copy of setInterval with reactivity built-in.

```jsx
import React, { useState } from 'react'
import { useInterval } from '@refolded/use-timing'

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

Demo:

https://user-images.githubusercontent.com/24810123/133683266-96775040-adbc-41de-a246-bb945f2d89e0.mp4

### useTimeout
Same API as useInterval, but only runs once instead of continuously.

### useCountdown
Allows you to provide a delay and it will count down from that delay to 0.

```jsx
import React, { useState } from 'react'
import { useCountdown } from '@refolded/use-timing'

const App = () => {
  const [count, setCount] = useState(0)

  const [delay, setDelay] = useState(5000)

  const [start, stop, remainingTime] = useCountdown(delay)

  return (
    <div>
      <h1>{count}</h1>
      <h2>{remainingTime}ms</h2>
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
      </div>
    </div>
  )
}
```

### useCycle
Allows you to provide an array of delays and cycles between them linearly.

```jsx
import React, { useState } from 'react'
import { useCycle } from '@refolded/use-timing'

const App = () => {
  const [count, setCount] = useState(0)

  const [delay, setDelay] = useState(500)

  const [start, stop, currentDelay] = useCycle(() => {
    setCount(count - 1)
  }, [delay, delay * 2, delay * 3])

  return (
    <div>
      <h1>{count}</h1>
      <h2>{currentDelay}ms</h2>
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
      </div>
    </div>
  )
}
```
Demo:

https://user-images.githubusercontent.com/24810123/133683783-bb7b995e-7f5e-4c36-a75e-187daddbc52e.mp4


### useInOut
Allows you to provide 2 callback functions, one will be executed as soon as the timer begins and the other at the end.

```jsx
import React, { useState } from 'react'
import { useInOut } from '@refolded/use-timing'

const App = () => {
  const [running, setRunning] = useState(false)

  const [delay, setDelay] = useState(500)

  const [start, stop] = useInOut(
    [
      // Will be executed immediately
      () => { setRunning(true) },
      // Will be executed after the duration of the timer
      () => { setRunning(false) }
    ]
    , delay)

  return (
    <div>
      <h1>{running}</h1>
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
      </div>
    </div>
  )
}
```

## License

MIT © [refolded](https://github.com/refolded)
