'use client';
import { TextFieldProps } from './types';
import './TextField.scss';
import '@/styles/colors.scss';
import { useEffect, useRef } from 'react';
import { HelperTextProps } from '../types/BaseInput';
/**
 * A controlled ``input`` field.
 */
function TextField(props: TextFieldProps): React.JSX.Element {
  const {
    className = '',
    placeholder,
    autoresize,
    helperText,
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
      <label className="component-helper-text-wrapper">
        <HelperText helperText={helperText} />
        <textarea
          onChange={handleChange}
          className={`component-text-field accent-background
        theme-emphasis-text ${size} ${className}`}
          {...others}
          rows={1}
          ref={ref}
          placeholder={placeholder ? placeholder + '*' : undefined}
        ></textarea>
      </label>
    );
  }

  return (
    <label className="component-helper-text-wrapper">
      <HelperText helperText={helperText} />
      <input
        type={type}
        onChange={handleChange}
        className={`component-text-field
        accent-background theme-emphasis-text ${size} ${className}`}
        {...others}
        placeholder={placeholder ? placeholder + '*' : undefined}
      />
    </label>
  );
}

function HelperText(props: HelperTextProps): React.JSX.Element {
  if (!props.helperText) {
    return <></>;
  }

  return <div className="component-helper-text">{props.helperText}</div>;
}

export default TextField;
