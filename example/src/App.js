import React, { useState } from 'react'
import { useInterval } from 'use-timing'

const App = () => {
  const [count, setCount] = useState(30000)
  const [delay, setDelay] = useState(500)
  const [start, stop] = useInterval(() => {
    setCount(count - 1)
  }, delay)
  const halfSpeed = () => setDelay(delay * 2)
  const doubleSpeed = () => setDelay(delay / 2)
  return (
    <div>
      <h1>{count}</h1>
      <div>
        <button
          onClick={() => {
            start()
          }}
        >
          Start Count
        </button>
        <button
          onClick={() => {
            stop()
          }}
        >
          Stop Count
        </button>
        <button
          onClick={() => {
            doubleSpeed()
          }}
        >
          Double speed
        </button>
        <button
          onClick={() => {
            halfSpeed()
          }}
        >
          Half speed
        </button>
      </div>
    </div>
  )
}
export default App
