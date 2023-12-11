import { ElementProps } from '../types/Element';

export interface BoxProps extends ElementProps {
  children?: React.ReactNode;

  /**
   * Defaults to ``div``
   */
  selector?: keyof HTMLElementTagNameMap;
}
