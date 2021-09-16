import React, { useState } from "react";
import { useInterval } from "use-timing";

const Counter = () => {
  const [delay, setDelay] = useState(1000);

  const [count, setCount] = useState(0);

  const [start, stop] = useInterval(() => {
    setCount(count + 1);
  }, delay);

  return (
    <div className='py-12 flex flex-col justify-center font-mono w-full m-auto h-screen items-center'>
      <h1 className='text-6xl font-semibold text-gray-400'>useInterval</h1>
      <h2 className='font-bold text-9xl py-4 text-green-500 my-2'>
        Count: {count}
      </h2>
      <div className='flex flex-col w-1/4 justify-center gap-2'>
        <label
          htmlFor='#useInterval'
          className='text-2xl text-gray-400 font-semibold'
        >
          Delay:
        </label>
        <input
          className='text-2xl rounded-full max-w-3xl w-full text-black p-4 my-3 text-center bg-green-100'
          id='useInterval'
          value={delay}
          onChange={(e) => setDelay(+e.target.value)}
        />
      </div>
      <div className='grid grid-cols-2 gap-3 py-10'>
        <button
          className='py-6 font-mono text-xl bg-green-800 px-10 rounded-full text-white font-bold leading-relaxed tracking-wider max-w-lg transform transition duration-200 hover:-translate-x-1 hover:-translate-y-1 focus:bg-gray-800'
          onClick={() => {
            start();
          }}
        >
          Start Count
        </button>
        <button
          className='py-6 font-mono text-xl border-2 border-gray-400 px-10 rounded-full text-white font-bold leading-relaxed tracking-wider max-w-lg transform transition duration-200 hover:-translate-x-1 hover:-translate-y-1 focus:border-green-400'
          onClick={() => {
            stop();
          }}
        >
          Stop Count
        </button>
      </div>
    </div>
  );
};
export default Counter;
