'use client';
import React from 'react';
import { ButtonProps } from './types';
import './Button.scss';
import BaseButtonWithIcon from '../internal/baseButton/BaseButtonWithIcon';
import { generateVariantClassName } from '@/util/generateVariantClassName/generateVariantClassName';

/**
 * A standard client button with preconfigured styling and coloring.
 * @param props
 * @returns
 */
function Button(props: ButtonProps): React.JSX.Element {
  const {
    className = '',
    color,
    size = 'medium',
    children,
    onClick,
    icon,
    variant = 'fill',
    ...others
  } = props;

  const variantClassName = generateVariantClassName(variant);
  const variantColorClassName = color ? `${variantClassName}-${color}` : variantClassName;

  return (
    <BaseButtonWithIcon
      icon={icon}
      className={`component-button 
        ${variantColorClassName} ${color}-effects size-${size}
        ${icon ? 'with-icon' : ''} ${className}`}
      onClick={onClick}
      {...others}
    >
      {icon}
      {children}
    </BaseButtonWithIcon>
  );
}

export default Button;
