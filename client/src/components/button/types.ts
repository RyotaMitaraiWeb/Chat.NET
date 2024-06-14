import { BaseButtonWithIconProps } from '../types/BaseButton';
import { palette, size } from '../types/options';

export interface ButtonProps extends BaseButtonWithIconProps {
  color?: palette | 'transparent';
  size?: size;
}
