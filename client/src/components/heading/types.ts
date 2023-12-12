import { ElementProps } from '../types/Element';

export interface HeadingProps extends ElementProps {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}
