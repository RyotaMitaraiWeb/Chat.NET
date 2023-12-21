import { ElementProps } from './Element';

export interface BaseListItemProps extends ElementProps {
  children: React.ReactNode;
  /**
   * Use this when some of the list items have icons, but others do not.
   * This property will align the non-icon items the same way as the icon
   * ones.
   */
  inset?: boolean;
  bold?: boolean;
}
