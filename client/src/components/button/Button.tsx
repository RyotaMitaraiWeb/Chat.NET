import React from 'react';
import { ButtonProps } from './types';
import './Button.scss';
import '@/styles/colors.scss';
import '@/styles/effects.scss';
import '@/styles/font.scss';
import Link from 'next/link';

/**
 * A standard button with preconfigured styling and coloring.
 *
 * **Note:** the button is rendered in a ``div``. All passed props apply
 * to the button and not the ``div``.
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
        <div>
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
        </div>
      );
    }

    return (
      <div>
        <Link
          className={`component-button ${color}
          ${color}-hover ${color}-click size-${size} ${className}`}
          onClick={onClick}
          href={href}
          {...others}
        >
          {children}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <button
        className={`component-button 
        ${color} ${color}-hover ${color}-click size-${size} ${className}`}
        onClick={onClick}
        {...others}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
