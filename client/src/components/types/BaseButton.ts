import React from 'react';
import { ElementProps } from './Element';

/**
 * Props that can be passed to each button-like element (e.g. hyperlinks, normal buttons, etc.)
 */
export interface BaseButtonProps extends ElementProps {
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  onKeyUp?: (event: React.KeyboardEvent) => void;
  type?: 'button' | 'submit';
}

export interface BaseButtonWithIconProps extends BaseButtonProps {
  icon?: React.ReactNode;
}
