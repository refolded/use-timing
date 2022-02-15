import { useCallback, useEffect, useState } from "react";
import { useInterval } from "../useInterval/index";

export const useCountdown = (
  inputDelay: number
): {
  start: () => void;
  stop: () => void;
  reset: () => void;
  currentTime: number;
} => {
  const [currentTime, setCurrentTime] = useState(inputDelay);

  const {
    start,
    stop,
    reset: resetInterval,
  } = useInterval(() => {
    setCurrentTime(currentTime - 1000);
  }, 1000);

  const reset = useCallback(() => {
    resetInterval();
    setCurrentTime(inputDelay);
  }, [inputDelay]);

  useEffect(() => {
    if (currentTime === 0) stop();
  }, [currentTime]);

  useEffect(() => {
    setCurrentTime(inputDelay);
  }, [inputDelay]);

  return { start, stop, reset, currentTime };
};
