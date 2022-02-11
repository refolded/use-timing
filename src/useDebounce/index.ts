import { useCallback, useRef } from "react";

export const useDebounce = (): ((
  callback?: () => void | Promise<void>,
  delay?: number
) => void) => {
  const timer = useRef<number>(0);

  const debounce = useCallback(
    (callback?: () => void | Promise<void>, delay?: number) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = window.setTimeout(() => {
        callback?.();
      }, delay || 100);
    },
    []
  );

  return debounce;
};
