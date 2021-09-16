import React, { useEffect, useState } from "react";
import { useCycle, useInterval } from "use-timing";

const Pomodoro = () => {
  const [workingTime, setWorkingTime] = useState(0.15 * 60000);

  const [restingTime, setRestingTime] = useState(0.05 * 60000);

  const [mode, setMode] = useState(true);

  const [currentTime, setCurrentTime] = useState(workingTime);

  const updateTime = (timeMode) =>
    setCurrentTime(timeMode ? workingTime : restingTime);

  const [startPomodoro, stopPomodoro, shift] = useCycle(() => {
    stopCounting();
    const newMode = !mode;
    setMode(newMode);
    updateTime(newMode);
    startCounting();
  }, [workingTime, restingTime]);

  const [startCounting, stopCounting] = useInterval(() => {
    setCurrentTime(currentTime - 1000);
  }, 1000);

  useEffect(() => {
    updateTime(mode);
  }, [workingTime, restingTime]);

  return (
    <div className='py-12 flex flex-col justify-center font-mono w-full m-auto items-center h-screen'>
      <h1 className='text-6xl font-semibold text-gray-400'>useCycle</h1>
      <h2 className='font-bold text-9xl py-4 text-green-500 my-2'>
        {mode ? "Working" : "Resting"}: {currentTime / 1000}s
      </h2>
      <div className='flex flex-col w-1/4 justify-center gap-3'>
        <label htmlFor='#working_time' className='text-2xl'>
          Working Time:
        </label>
        <input
          className='text-2xl rounded-full w-full text-black p-4 my-3 text-center bg-green-100'
          value={workingTime}
          min='1000'
          onChange={(e) => setWorkingTime(+e.target.value)}
        />
      </div>

      <div className='flex flex-col w-1/4 justify-center gap-3 mt-3'>
        <label htmlFor='#working_time' className='text-2xl'>
          Resting Time:
        </label>
        <input
          className='text-2xl rounded-full  w-full text-black p-4 my-3 text-center bg-green-100'
          value={restingTime}
          onChange={(e) => setRestingTime(+e.target.value)}
        />
      </div>
      <div className='grid grid-cols-2 gap-3 py-10'>
        <button
          className='py-6 font-mono text-xl bg-green-800 px-10 rounded-full text-white font-bold leading-relaxed tracking-wider max-w-xl'
          onClick={() => {
            startPomodoro();
            startCounting();
          }}
        >
          Start Count
        </button>
        <button
          className='py-6 font-mono text-xl border-2 border-gray-400 px-10 rounded-full text-white font-bold leading-relaxed tracking-wider max-w-xl'
          onClick={() => {
            stopPomodoro();
            stopCounting();
          }}
        >
          Stop Count
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
