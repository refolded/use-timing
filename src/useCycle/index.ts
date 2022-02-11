import { useCallback, useEffect, useRef } from "react";
import { useInterval } from "../useInterval/index";

const computeIndex = (index: number, array: number[]) =>
  array.length > 1 ? (index + 1) % array.length : 0;

export const useCycle = (
  callback: Function,
  delays: number[]
): {
  start: () => void;
  stop: () => void;
  currentDelay: number;
} => {
  // Define the delay and its starting index
  const delayIndex = useRef(0);
  const delay = useRef(delays[delayIndex.current]);

  // Define the shifting function to move the delay index
  const shift = useCallback(() => {
    delayIndex.current = computeIndex(delayIndex.current, delays);
    delay.current = delays[delayIndex.current];
  }, []);

  // Create the interval
  const { start, stop } = useInterval(() => {
    shift();
    callback();
  }, delay.current);

  // If the delays change, restart the interval
  useEffect(() => {
    delay.current = delays[delayIndex.current];
  }, [delays]);

  // Return the interval control functions and current delay
  return { start, stop, currentDelay: delay.current };
};
