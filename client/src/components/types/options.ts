/**
 * Unless stated otherwise, defaults to ``success``
 */
export type severity = 'success' | 'info' | 'error' | 'warning';
export type palette = 'primary' | 'secondary' | severity;
export type size = 'small' | 'medium' | 'large';

/**
 * Unless stated otherwise, defaults to ``left``.
 */
export type side = 'left' | 'right' | 'top' | 'bottom';

/**
 * Determines how palette colors are applied to the element.
 */
export type variant = 'fill' | 'text' | 'outlined';
