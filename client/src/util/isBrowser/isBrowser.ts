/**
 * Determines whether this function is being called
 * in a client environment.
 */
export function isBrowser(): boolean;
/**
 * Determines whether this function is being called
 * in a client environment and whether the requested
 * DOM elements are available.
 * @param selectors selectors which need to be available
 * to proceed.
 */
export function isBrowser(...selectors: string[]): boolean;
export function isBrowser(...selectors: string[]): boolean {
  const windowIsAvailable = typeof window !== 'undefined';
  if (!windowIsAvailable) {
    return false;
  }

  if (selectors && selectors.length) {
    for (const selector of selectors) {
      if (document.querySelector(selector) === null) {
        return false;
      }
    }
  }

  return true;
}
