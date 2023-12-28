import { BaseCheckboxProps } from '../internal/baseCheckbox/types';
import { palette, side, size } from '../types/options';

export interface CheckboxProps extends BaseCheckboxProps {
  label?: string;
  icon?: React.ReactNode;
  size?: size;
  /** Defaults to right. Determines how the label text is positioned
   * against the checkbox
   */
  side?: side;
  color?: palette;
}
