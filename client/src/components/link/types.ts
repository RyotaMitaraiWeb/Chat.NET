import { ElementProps } from '../types/Element';
import { palette } from '../types/options';

export interface LinkProps extends ElementProps {
  target?: React.HTMLAttributeAnchorTarget;
  href: string;
  children: React.ReactNode;

  /**
   * If not provided, a custom color will be used, depending on
   * the user's color preferences.
   */
  color?: palette | 'default';
}
