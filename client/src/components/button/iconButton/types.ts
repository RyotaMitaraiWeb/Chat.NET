import { BaseButtonProps } from '@/components/types/BaseButton';
import { palette, size } from '@/components/types/options';

export interface IconButtonProps extends BaseButtonProps {
  color?: palette;
  size?: size;
}
