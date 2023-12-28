import { BaseCheckboxProps } from '../internal/baseCheckbox/types';
import { palette, side, size } from '../types/options';

export interface CheckboxProps extends BaseCheckboxProps {
  children?: React.ReactNode;
  /**
   * When passing an icon, you should pass just the icon itself
   * (aka do not wrap it in an ``<Icon>`` tag, this is taken care of by the
   * checkbox itself)
   */
  icon?: React.ReactNode;
  size?: size;

  /** Defaults to right. Determines how the label text is positioned
   * against the checkbox. Note that the positioning is only visual;
   * in the DOM, the label always appears before the checkbox.
   */

  side?: side;
  color?: palette;
}
