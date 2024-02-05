import { useEffect, useMemo, useRef } from 'react';

function debounce<T extends (...args: unknown[]) => ReturnType<T>>(
  callback: T,
  timeout = 500,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
}

export const useDebounce = (callback: (...args: unknown[]) => void, timeout = 500) => {
  const ref = useRef((...args: unknown[]) => {
    args;
  });

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = (...args: unknown[]) => {
      ref.current?.(args);
    };
    return debounce(func, timeout);
  }, [timeout]);

  return debouncedCallback;
};
