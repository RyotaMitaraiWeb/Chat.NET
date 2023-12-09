'use client';
import React from 'react';
import { ButtonProps } from './types';
import './Button.scss';
import '@/styles/colors.scss';
import '@/styles/effects.scss';
import '@/styles/font.scss';
import Link from 'next/link';

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
    href,
    target,
    onClick,
    ...others
  } = props;
  if (href) {
    if (target === '_blank') {
      return (
        <a
          className={`component-button ${color}
            ${color}-hover ${color}-click size-${size} ${className}`}
          onClick={onClick}
          href={href}
          {...others}
          target={target}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        className={`component-button ${color}
          ${color}-hover ${color}-click size-${size} ${className}`}
        onClick={onClick}
        href={href}
        {...others}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`component-button 
        ${color} ${color}-hover ${color}-click size-${size} ${className}`}
      onClick={onClick}
      {...others}
    >
      {children}
    </button>
  );
}

export default Button;
