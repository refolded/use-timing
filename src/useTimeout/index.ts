import { useState, useCallback, useEffect, useRef } from 'react';

export const useTimeout = (callback: Function, delay: number) => {
  const savedCallback = useRef<Function | null>(null);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(delay);

  const start = useCallback(() => setRunning(true), []);
  const stop = useCallback(() => setRunning(false), []);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    setTime(delay);
  }, [delay]);

  useEffect(() => {
    const tick = () => savedCallback.current?.();

    if (delay !== null && running) {
      const id = window.setTimeout(tick, time);
      return () => window.clearTimeout(id);
    }

    return () => {};
  }, [delay, time, running]);

  return [start, stop];
};
