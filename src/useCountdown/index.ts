import { useState, useEffect } from 'react';
import { useInterval } from '../useInterval/index';

export const useCountdown = (inputDelay: number) => {
  const [currentTime, setCurrentTime] = useState(inputDelay);

  const [start, stop] = useInterval(() => {
    setCurrentTime(currentTime - 1000);
  }, 1000);

  useEffect(() => {
    if (currentTime === 0) stop();
  }, [currentTime]);

  useEffect(() => {
    setCurrentTime(inputDelay);
  }, [inputDelay]);

  return [start, stop, currentTime];
};
