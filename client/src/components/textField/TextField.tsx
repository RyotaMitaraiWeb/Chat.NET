'use client';
import { TextFieldProps } from './types';
import './TextField.scss';
import '@/styles/colors.scss';
import { useEffect, useRef } from 'react';
/**
 * A controlled ``input`` field.
 */
function TextField(props: TextFieldProps): React.JSX.Element {
  const {
    className = '',
    placeholder,
    autoresize,
    onChange,
    size = 'medium',
    type = 'text',
    ...others
  } = props;
  const ref = useRef<HTMLTextAreaElement>(null);
  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (onChange) {
      onChange(event);
    }

    adjustHeight();
  }

  function adjustHeight() {
    if (ref.current && autoresize) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current!.scrollHeight}px`;
    }
  }

  useEffect(() => {
    adjustHeight();
  });

  if (type === 'text' && autoresize) {
    return (
      <textarea
        onChange={handleChange}
        className={`component-text-field accent-background
        theme-emphasis-text ${size} ${className}`}
        {...others}
        rows={1}
        ref={ref}
        placeholder={placeholder ? placeholder + '*' : undefined}
      ></textarea>
    );
  }

  return (
    <input
      type={type}
      onChange={handleChange}
      className={`component-text-field accent-background theme-emphasis-text ${size} ${className}`}
      {...others}
      placeholder={placeholder ? placeholder + '*' : undefined}
    />
  );
}

export default TextField;
