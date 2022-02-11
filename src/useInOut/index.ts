import { useCallback, useRef, useState } from "react";
import { useTimeout } from "../useTimeout/index";

export const useInOut = (
  [firstCallback, secondCallback]: [Function, Function],
  delay: number
): {
  start: () => void;
  stop: () => void;
} => {
  const initialCallback = useRef<Function>(firstCallback);
  const endingCallback = useRef<Function>(secondCallback);
  const [internalDelay, setInternalDelay] = useState(delay);
  const { start: timeoutStart } = useTimeout(
    endingCallback.current,
    internalDelay
  );
  const start = useCallback(() => {
    timeoutStart();
    setTimeout(initialCallback.current, 0);
  }, []);
  const stop = useCallback(() => {
    setInternalDelay(0);
  }, []);
  return { start, stop };
};
