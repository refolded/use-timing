import { useCallback, useRef, useState } from "react";
import { useTimeout } from "../useTimeout/index";

export const useInOut = ([firstCallback, secondCallback], delay) => {
  const initialCallback = useRef(firstCallback);
  const endingCallback = useRef(secondCallback);
  const [internalDelay, setInternalDelay] = useState(delay);
  const [timeoutStart] = useTimeout(endingCallback.current, internalDelay);
  const start = useCallback(() => {
    timeoutStart();
    setTimeout(initialCallback.current, 0);
  }, []);
  const stop = useCallback(() => {
    setInternalDelay(0);
  }, []);
  return [start, stop];
};
