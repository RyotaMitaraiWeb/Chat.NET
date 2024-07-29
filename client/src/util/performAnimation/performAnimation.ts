function prefersAnimations(): boolean {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  return prefersReducedMotion && prefersReducedMotion.matches;
}

type PerformAnimationsOptions = {
  timeout: number;
};

/**
 * Executes the ``callback`` in a timeout if the user prefers animations,
 * otherwise, it executes the ``callback`` immediately.
 * @param callback
 * @param options
 */
export function performAnimation(callback: () => void, options: PerformAnimationsOptions) {
  if (!prefersAnimations()) {
    callback();
  } else {
    setTimeout(callback, options.timeout);
  }
}
