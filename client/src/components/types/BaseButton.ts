import { ElementProps } from './Element';

/**
 * Props that can be passed to each button-like element (e.g. hyperlinks, normal buttons, etc.)
 */
export interface BaseButtonProps extends ElementProps {
  children: React.ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
