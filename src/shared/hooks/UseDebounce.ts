import { useCallback, useRef } from "react";
import { Environment } from "../environment";

export const useDebounce = (
  delay = Environment.DEBOUNCE_DELAY, 
  notDelayInFirstTime = false
) => {

  const debouncing = useRef<NodeJS.Timeout>();
  const isFirstTime = useRef(notDelayInFirstTime);

  const debounce = useCallback((func: () => void) => {
    if (isFirstTime.current) {
      isFirstTime.current = false;
      func();
    } else {
      if (debouncing.current) {
        clearTimeout(debouncing.current);
      }
      debouncing.current = setTimeout(() => { func(); }, delay);
    }
  }, [delay]);

  return debounce;
};