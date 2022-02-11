# use-timing

React hooks for working with JavaScript timing functions.

## What is it?
Working with time is a common task in React applications and for some reason it is not natively intuitive to do so. To solve this, most React libraries provide a set of hooks that allow you to work with time, a lot of them including two most basic hooks from [this post by Dan Abramov](https://overreacted.io/making-setinterval-declarative-with-react-hooks/).

At first this library included a basic implementation of `useInterval` as defined in that post as well as its counterpart `useTimeout`, however we eventually realized that there's more that can be done with them and so the library now extends their functionality while also providing a multitude of other hooks that streamline some common use-cases that could come up for the two hooks.

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

### Important note
**From `v2.0` onwards, all use-timing hooks now return objects instead of arrays**. While this makes it easier to pick just the property you need, it also means this is a major breaking change for previous users of the library. If you are using the library in a previous version, you should migrate to the new version by replacing the array syntax with object destructuring as shown below.

**All delay inputs for all hooks are in `milliseconds`**. If you need to work with large time-frames such as hours, days, weeks, months, years, etc, you should use a transformation library like [date-fns](https://date-fns.org/) or multiplication with native `Date`. Examples using this are shown in the demo and in the `example` directory of this repository.

### useInterval

useInterval allows you to call a function at a given interval, much like setInterval, with the advantage of not having to wrap it in complex behaviors in `useEffect` to clear the interval or reset.

The added benefit of a custom react hook is that the delay is dynamic, so you can dynamically change the delay parameter and on the next render the interval will automatically re-initialize with the new delay.

From `v2.0` onwards, useInterval now returns an object containing `start` and `stop` rather than an array. These are functions that allow you to pause and unpause the interval at will. All hooks below also now return an object instead of an array.

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
  const {start, stop} = useInterval(() => {
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

### useCountdown
An abstraction of a common use-case for useTimeout/setTimeout is to countdown a timer. This function provides that functionality with a simple API.

Allows you to provide a delay and it will count down from that delay to 0.

```jsx
import React, { useState } from 'react'
import { useCountdown } from '@refolded/use-timing'

const App = () => {
  const [count, setCount] = useState(0)

  const [delay, setDelay] = useState(5000)
  // currentTime is the time left in the countdown.
  const {start, stop, currentTime} = useCountdown(delay)

  return (
    <div>
      <h1>{count}</h1>
      <h2>{currentTime}ms</h2>
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
An abstraction of a common use-case for useInterval/setInterval is to cycle through a set of timers, for example when implementing a Pomodoro timer or cycling through multiple common delays.

useCycle provides a simplified wrapper around useInterval that allows you to cycle through any size set of delays infinitely.

```jsx
import React, { useState } from 'react'
import { useCycle } from '@refolded/use-timing'

const App = () => {
  const [count, setCount] = useState(0)

  const [delay, setDelay] = useState(500)

  // You can add as many delays to the array as you like.
  const {start, stop, currentDelay} = useCycle(() => {
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

### useInOut
Allows you to provide 2 callback functions, one will be executed as soon as the timer begins and the other at the end.

Technically the opposite of `useCycle`, instead of multiple delays this hook allows you to provide multiple functions that will be called at the start and end of the timer.

This hook is limited to 2 callbacks as inputs due to the implementation.

```jsx
import React, { useState } from 'react'
import { useInOut } from '@refolded/use-timing'

const App = () => {
  const [running, setRunning] = useState(false)

  const [delay, setDelay] = useState(500)

  const {start, stop} = useInOut(
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

### useDebounce
Calling this hook will return a function that will allow you to debounce any changes you need within the current component.

Unlike usual useDebounce implementations, this does not require passing values into it nor does it rely on any external data. The hook simply returns the debouncing function that you can use with any delay you want. This makes it very versatile in that it can debounce pretty much anything from inputs to API calls to button presses or entire renders.

```jsx
import { useState } from "react";
import { useDebounce } from "@refolded/use-timing";

const Debounce = () => {
  const debounce = useDebounce();
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(0);

  return (
    <>
        <span>
          {count}
        </span>
        <div>
          <input
            value={delay}
            onChange={(e) => setDelay(+e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={() => {
              // Use it here to debounce setCount.
              debounce(() => {
                setCount(count + 1);
              }, delay);

              // It can even debounce async logic.
              debounce(async () => {
                const response = await fetch('myapiurl');
              }, 500);
            }}
          >
            Increase Count
          </button>
        </div>
    </>
  );
};
```

## License

MIT © 2022 [refolded](https://github.com/refolded)
