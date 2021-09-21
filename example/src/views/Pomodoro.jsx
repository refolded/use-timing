import React, { useState, useEffect } from "react";
import { useCycle, useCountdown } from "use-timing";

import { intervalToDuration } from "date-fns";

import Wrapper from "../components/Wrapper";
import CubeIcon from "../components/CubeIcon";
import TimeComponent from "../components/TimeComponent";

const Pomodoro = () => {
  const [workingTime, setWorkingTime] = useState(25);
  const [restingTime, setRestingTime] = useState(5);
  const [mode, setMode] = useState(true);

  const [startPomodoro, stopPomodoro] = useCycle(() => {
    stopCounting();
    const newMode = !mode;
    setMode(newMode);
    startCounting();
  }, [workingTime * 60000, restingTime * 60000]);

  const [startCounting, stopCounting, remainingTime] = useCountdown(
    mode ? workingTime * 60000 : restingTime * 60000
  );

  const [duration, setDuration] = useState(
    intervalToDuration({
      start: new Date(),
      end: new Date(Date.now() + remainingTime),
    })
  );

  useEffect(() => {
    setDuration(
      intervalToDuration({
        start: new Date(),
        end: new Date(Date.now() + remainingTime),
      })
    );
  }, [remainingTime]);

  return (
    <Wrapper>
      <h1>useCycle</h1>
      <div className='grid grid-flow-col gap-5 text-center auto-cols-max'>
        <TimeComponent value={duration.hours} label='hr' />
        <TimeComponent value={duration.minutes} label='min' />
        <TimeComponent value={duration.seconds} label='sec' />
      </div>
      <div className='w-1/2 mt-6 form-control'>
        <label className='label'>
          <span className='text-2xl label-text'>Working Time (minutes)</span>
        </label>
        <input
          type='number'
          className='text-3xl text-center input input-bordered input-lg'
          value={workingTime}
          onChange={(e) => setWorkingTime(+e.target.value)}
        />
      </div>
      <div className='w-1/2 mt-4 form-control'>
        <label className='label'>
          <span className='text-2xl label-text'>Resting Time (minutes)</span>
        </label>
        <input
          type='number'
          className='text-3xl text-center input input-bordered input-lg'
          value={restingTime}
          onChange={(e) => setRestingTime(+e.target.value)}
        />
      </div>

      <div className='grid w-1/2 grid-cols-2 gap-10 mt-12'>
        <button
          className='inline-flex gap-3 btn btn-primary btn-lg'
          onClick={() => {
            startPomodoro();
            startCounting();
          }}
        >
          <CubeIcon />
          <span>Start</span>
        </button>
        <button
          className='inline-flex gap-3 btn btn-primary btn-lg'
          onClick={() => {
            stopPomodoro();
            stopCounting();
          }}
        >
          <CubeIcon />
          <span>Stop</span>
        </button>
      </div>
    </Wrapper>
  );
};

export default Pomodoro;
