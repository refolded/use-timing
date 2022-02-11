import { useInterval } from "@refolded/use-timing";
import React, { useState } from "react";
import CubeIcon from "../components/CubeIcon";
import Wrapper from "../components/Wrapper";

const Counter = (): React.ReactElement => {
  const [delay, setDelay] = useState(1);
  const [count, setCount] = useState(0);
  const { start, stop } = useInterval(() => {
    setCount(count + 1);
  }, 1000 / delay);

  return (
    <Wrapper>
      <h1>useInterval</h1>
      <span className='font-mono text-6xl'>{count}</span>
      <div className='w-1/2 mt-6 form-control'>
        <label className='label'>
          <span className='text-2xl label-text'>Speed</span>
        </label>
        <input
          type='number'
          className='text-3xl text-center input input-bordered input-lg'
          id='useInterval'
          value={delay}
          onChange={(e) => setDelay(+e.target.value)}
        />
      </div>

      <div className='grid w-1/2 grid-cols-2 gap-10 mt-12'>
        <button
          className='inline-flex gap-3 btn btn-primary btn-lg'
          onClick={() => {
            start();
          }}
        >
          <CubeIcon />
          <span>Start</span>
        </button>
        <button
          className='inline-flex gap-3 btn btn-primary btn-lg'
          onClick={() => {
            stop();
          }}
        >
          <CubeIcon />
          <span>Stop</span>
        </button>
      </div>
    </Wrapper>
  );
};
export default Counter;
