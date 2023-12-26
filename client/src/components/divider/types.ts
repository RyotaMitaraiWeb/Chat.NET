import { ElementProps } from '../types/Element';

export interface DividerProps extends ElementProps {
  /**
   * Vertical drawers are best used in flex containers.
   */
  variant?: 'horizontal' | 'vertical';
}
