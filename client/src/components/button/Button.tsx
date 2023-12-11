'use client';
import React from 'react';
import { ButtonProps } from './types';
import './Button.scss';
import '@/styles/colors.scss';
import '@/styles/effects.scss';
import '@/styles/font.scss';
import BaseButton from '../internal/baseButton/BaseButton';

/**
 * A standard client button with preconfigured styling and coloring.
 * @param props
 * @returns
 */
function Button(props: ButtonProps): React.JSX.Element {
  const {
    className = '',
    color = 'primary',
    size = 'medium',
    children,
    onClick,
    ...others
  } = props;
  return (
    <BaseButton
      className={`component-button 
        ${color} ${color}-hover ${color}-click size-${size} ${className}`}
      onClick={onClick}
      {...others}
    >
      {children}
    </BaseButton>
  );
}

export default Button;
