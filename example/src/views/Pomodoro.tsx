import { useCountdown, useCycle } from "@refolded/use-timing";
import { intervalToDuration } from "date-fns";
import React, { useEffect, useState } from "react";
import CubeIcon from "../components/CubeIcon";
import TimeComponent from "../components/TimeComponent";
import Wrapper from "../components/Wrapper";

const Pomodoro = (): React.ReactElement => {
  const [workingTime, setWorkingTime] = useState(25);
  const [restingTime, setRestingTime] = useState(5);
  const [mode, setMode] = useState(true);

  const {
    start: startPomodoro,
    stop: stopPomodoro,
    skip,
  } = useCycle(() => {
    stopCounting();
    const newMode = !mode;
    setMode(newMode);
    startCounting();
  }, [workingTime * 60000, restingTime * 60000]);

  const {
    start: startCounting,
    stop: stopCounting,
    currentTime: remainingTime,
  } = useCountdown(mode ? workingTime * 60000 : restingTime * 60000);

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
        <TimeComponent value={duration.minutes as number} label='min' />
        <TimeComponent value={duration.seconds as number} label='sec' />
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
        <button
          className='inline-flex gap-3 btn btn-primary btn-lg'
          onClick={skip}
        >
          <CubeIcon />
          <span>Skip</span>
        </button>
      </div>
    </Wrapper>
  );
};

export default Pomodoro;
