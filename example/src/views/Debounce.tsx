import { useDebounce } from "@refolded/use-timing";
import React, { useState } from "react";
import CubeIcon from "../components/CubeIcon";
import Wrapper from "../components/Wrapper";

const Debounce = (): React.ReactElement => {
  const debounce = useDebounce();
  const [count, setCount] = useState<number>(0);
  const [delay, setDelay] = useState<number>(0);

  return (
    <>
      <Wrapper>
        <h1>useDebounce</h1>
        <span className='font-mono text-2xl'>
          Rockets have been launched {count} times
        </span>
        <div className='w-1/2 mt-6 form-control'>
          <label className='label'>
            <span className='text-2xl label-text'>Throttle Power</span>
          </label>
          <input
            type='number'
            className='text-3xl text-center input input-bordered input-lg'
            id='useInterval'
            value={delay}
            onChange={(e) => setDelay(+e.target.value)}
          />
        </div>
        <div className='grid w-1/2 mt-12'>
          <button
            className='inline-flex gap-3 btn btn-primary btn-lg'
            onClick={() => {
              debounce(() => {
                setCount(count + 1);
              }, delay);
            }}
          >
            <CubeIcon />
            <span>Launch Rockets</span>
          </button>
        </div>
      </Wrapper>
    </>
  );
};

export default Debounce;
