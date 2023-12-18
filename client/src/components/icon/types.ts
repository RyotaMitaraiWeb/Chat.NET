import { ElementProps } from '../types/Element';
import { size } from '../types/options';

export interface IconProps extends ElementProps {
  children: React.ReactNode;
  size?: size;
}
