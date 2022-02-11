import { useCountdown } from "@refolded/use-timing";
import { intervalToDuration } from "date-fns";
import React, { useEffect, useState } from "react";
import CubeIcon from "../components/CubeIcon";
import TimeComponent from "../components/TimeComponent";
import Wrapper from "../components/Wrapper";

const Countdown = (): React.ReactElement => {
  const [delay, setDelay] = useState(25);
  const { start, stop, currentTime } = useCountdown(delay * 60000);
  const [duration, setDuration] = useState(
    intervalToDuration({
      start: new Date(),
      end: new Date(Date.now() + currentTime),
    })
  );

  useEffect(() => {
    setDuration(
      intervalToDuration({
        start: new Date(),
        end: new Date(Date.now() + currentTime),
      })
    );
  }, [currentTime]);

  return (
    <Wrapper>
      <h1>useCountdown</h1>

      <div className='grid grid-flow-col gap-5 text-center auto-cols-max'>
        <TimeComponent value={duration.hours as number} label='hr' />
        <TimeComponent value={duration.minutes as number} label='min' />
        <TimeComponent value={duration.seconds as number} label='sec' />
      </div>

      <div className='w-1/2 mt-12 form-control'>
        <label className='label'>
          <span className='text-2xl label-text'>Duration (minutes)</span>
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
export default Countdown;
