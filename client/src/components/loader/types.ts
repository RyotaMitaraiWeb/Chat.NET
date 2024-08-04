import { ElementProps } from '../types/Element';
import { palette, size } from '../types/options';

export interface LoaderProps extends ElementProps {
  text?: React.ReactNode;
  color?: palette;
  size?: size;
}
