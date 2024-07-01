import { BaseButtonWithIconProps } from '../types/BaseButton';
import { palette, size, variant } from '../types/options';

export interface ButtonProps extends BaseButtonWithIconProps {
  color?: palette | 'transparent';
  size?: size;
  variant?: variant;
}
