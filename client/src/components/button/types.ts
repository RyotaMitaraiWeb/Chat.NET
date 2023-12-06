import { BaseButtonProps } from '../types/BaseButton';
import { palette, size } from '../types/options';

export interface ButtonProps extends BaseButtonProps {
  /** Passing this property to the element with a valid value
   * will turn it into a <Link> that is styled like a button
   */
  href?: string;

  /**
   * If equal to ``_blank`` and passed alongside a valid ``href``,
   * this will turn the element into an ``<a>`` that is styled like a button
   */
  target?: string;
  color?: palette;
  size?: size;
}
