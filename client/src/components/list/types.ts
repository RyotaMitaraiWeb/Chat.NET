import { ElementProps } from '../types/Element';
import { size } from '../types/options';

export interface ListProps extends ElementProps {
  size?: size;
  children?: React.ReactNode;

  /**
   * Whether to put a border between each list item
   */
  outlined?: boolean;
}
