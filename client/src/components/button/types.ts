import { BaseButtonWithIconProps } from '../types/BaseButton';
import { palette, size, variant } from '../types/options';

export interface ButtonProps extends BaseButtonWithIconProps {
  /**
   * If no color is passed,
   * the component will provide default styling with mostly transparent colors
   */
  color?: palette;
  size?: size;
  variant?: variant;
}
