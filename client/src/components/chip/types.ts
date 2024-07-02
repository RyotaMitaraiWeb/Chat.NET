import { BaseButtonProps } from '../types/BaseButton';
import { palette, size } from '../types/options';

export interface ChipProps extends BaseButtonProps {
  onClick?: () => void;
  onDelete?: () => void;
  deleteIcon?: React.ReactNode;
  variant?: 'fill' | 'outlined';
  color?: palette;
  multiline?: boolean;
  startIcon?: React.ReactNode;
  size?: size;
  clickable?: boolean;
}
