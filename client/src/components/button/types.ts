import { HTMLAttributeAnchorTarget } from 'react';
import { BaseButtonWithIconProps } from '../types/BaseButton';
import { palette, size } from '../types/options';

export interface ButtonProps extends BaseButtonWithIconProps {
  /** Passing this property to the element with a valid value
   * will turn it into a <Link> that is styled like a button
   */
  href?: string;

  /**
   * If equal to ``_blank`` and passed alongside a valid ``href``,
   * this will turn the element into an ``<a>`` that is styled like a button
   */
  target?: HTMLAttributeAnchorTarget;
  color?: palette;
  size?: size;
}
