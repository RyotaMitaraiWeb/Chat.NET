'use client';
import { TextFieldProps } from './types';
import './TextField.scss';
import '@/styles/colors.scss';
import { useEffect, useRef } from 'react';
import { HelperTextProps, LabelTextProps } from '../types/BaseInput';
/**
 * A controlled ``input`` field.
 */
function TextField(props: TextFieldProps): React.JSX.Element {
  const {
    className = '',
    label = '',
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
    const height = Number(ref.current?.scrollHeight) || 0;
    return (
      <label className="component-helper-text-wrapper">
        <LabelText bottom={height} size={size} labelText={label} />
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
      <LabelText size={size} labelText={label} />
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

function LabelText(props: LabelTextProps): React.JSX.Element {
  if (!props.labelText) {
    return <></>;
  }

  const style = props.bottom ? { bottom: props.bottom + 5 } : undefined;

  return (
    <div style={style} className={`component-label-text theme-emphasis-text ${props.size}`}>
      {props.labelText}
    </div>
  );
}

export default TextField;
