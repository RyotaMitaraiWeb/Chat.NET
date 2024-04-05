import { useState } from 'react';

/**
 * Executes the callback only on the first render.
 * @param callback
 * @returns
 */
export const useInit = (callback: React.EffectCallback) => {
  const [initialized, setInitialized] = useState(false);
  if (!initialized) {
    setInitialized(true);
    callback();
  }

  return () => {};
};
