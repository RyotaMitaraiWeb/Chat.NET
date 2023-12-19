/**
 * Returns the first element within the specified selector that can
 * receive focus (if such exists).
 * @param parentSelector the selector within which to search for focusable elements
 */
export function findFirstFocusableElement(parentSelector: string) {
  const firstFocusableElement = document.querySelector(
    `${parentSelector} input,
    ${parentSelector} select,
    ${parentSelector} a,
    ${parentSelector} textarea,
    ${parentSelector} button,
    ${parentSelector} area`,
  ) as
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLAnchorElement
    | HTMLTextAreaElement
    | HTMLButtonElement
    | HTMLAreaElement
    | null;

  return firstFocusableElement;
}
