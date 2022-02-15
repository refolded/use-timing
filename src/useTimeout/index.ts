import { useCallback, useEffect, useRef, useState } from "react";

export const useTimeout = (
  callback: Function,
  delay: number
): {
  start: () => void;
  stop: () => void;
  reset: () => void;
} => {
  const savedCallback = useRef<Function | null>(null);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(delay);
  const [update, forceUpdate] = useState(0);

  const start = useCallback(() => setRunning(true), []);
  const stop = useCallback(() => setRunning(false), []);
  const reset = useCallback(() => {
    setTime(delay);
    forceUpdate((update) => update + 1);
  }, [delay]);

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
  }, [delay, time, running, update]);

  return { start, stop, reset };
};
