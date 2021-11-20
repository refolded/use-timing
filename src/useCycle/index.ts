import { useRef, useEffect, useCallback } from 'react';
import { useInterval } from '../useInterval/index';

/**
 *
 * @param {number} index: the current index
 * @param {Array<number>} array: the array of delays
 * @returns {number} newIndex: the new index in the given array, or 0 for single element arrays.
 */
const computeIndex = (index: number, array: number[]) =>
  array.length > 1 ? (index + 1) % array.length : 0;

/**
 *
 * @param {Function} callback: Callback function to be looped.
 * @param {Array<number>} delays: Array of delays (in milliseconds) to cycle through.
 * @returns {Array} [start, stop, current delay].
 */
export const useCycle = (callback: Function, delays: number[]) => {
  // Define the delay and its starting index
  const delayIndex = useRef(0);
  const delay = useRef(delays[delayIndex.current]);

  // Define the shifting function to move the delay index
  const shift = useCallback(() => {
    delayIndex.current = computeIndex(delayIndex.current, delays);
    delay.current = delays[delayIndex.current];
  }, []);

  // Create the interval
  const [start, stop] = useInterval(() => {
    shift();
    callback();
  }, delay.current);

  // If the delays change, restart the interval
  useEffect(() => {
    delay.current = delays[delayIndex.current];
  }, [delays]);

  // Return the interval control functions and current delay
  return [start, stop, delay.current];
};
