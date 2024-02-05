import { useEffect, useMemo, useRef } from 'react';

type DebouncedCallback = (...args: unknown[]) => void;

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

/**
 * If ``callback`` is called multiple times before the ``timeout`` is finished
 * then only the last call will execute.
 * @param callback
 * @param timeout expressed in miliseconds, defaults to 500 (half a second)
 * @returns a debounced function that calls ``callback``.
 */
export const useDebounce = (callback: DebouncedCallback, timeout = 500) => {
  const ref = useRef<DebouncedCallback>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func: DebouncedCallback = (...args: unknown[]) => {
      ref.current?.(args);
    };
    return debounce(func, timeout);
  }, [timeout]);

  return debouncedCallback;
};
