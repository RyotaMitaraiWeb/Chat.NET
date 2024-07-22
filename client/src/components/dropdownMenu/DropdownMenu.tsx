'use client';
import { useRef, useState } from 'react';
import './DropdownMenu.scss';
import { DropdownMenuProps } from './types';
import { useOutsideClick } from '@/hooks/useOutsideClick/useOutsideClick';

function DropdownMenu(props: DropdownMenuProps): React.JSX.Element {
  const {
    className = '',
    values,
    renderOption,
    value,
    onChange,
    disabled,
    label = '',
    labelId = '',
    ...others
  } = props;

  const [open, setOpen] = useState(false);
  const disabledClass = disabled ? 'disabled' : '';

  const [temporarySelectValue, setTemporarySelectValue] = useState(value || values[0]);

  const userDefinedElements = (values as never[]).map(renderOption);
  const valueIndex = value ? values.indexOf(value) : 0;

  const firstValue = values[0];
  const lastValue = values[values.length - 1];

  const selectedValueElement = userDefinedElements[valueIndex];
  const elementsToRender = values.map((value, index) => {
    const element = renderOption(value, index);
    return (
      <div
        key={value}
        id={`option-${value}`}
        className={`dropdown-menu-option
          ${props.value === value ? 'selected' : 'not-selected'}
          ${value === temporarySelectValue ? 'focused' : 'not-focused'}`}
        aria-selected={props.value === value}
        role="option"
        onClick={() => {
          if (onChange) {
            onChange(value);
            setOpen(false);
            setTemporarySelectValue(value);
          }
        }}
      >
        {element}
      </div>
    );
  });

  function toggleMenu() {
    setOpen((o) => !o);
    ref.current?.focus();
  }

  function closeByOutsideClick() {
    setOpen(false);
  }

  function handleKeyPress(event: React.KeyboardEvent) {
    if (event.key === 'Enter' || event.code === 'Space') {
      setOpen((o) => !o);
      if (open && onChange) {
        onChange(temporarySelectValue);
      }
    } else if (event.key === 'Home') {
      setOpen(true);
      setTemporarySelectValue(firstValue);
      ref.current?.focus();
    }
  }

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, closeByOutsideClick);

  return (
    <div
      aria-disabled={disabled}
      className={`component-dropdown-menu ${className} ${disabledClass}`}
      {...others}
      ref={ref}
    >
      {label ? (
        <div onClick={toggleMenu} id={labelId} className="dropdown-menu-label">
          {label}
        </div>
      ) : null}
      <div
        onClick={toggleMenu}
        className="dropdown-menu-selected-value"
        aria-controls={`combobox-${labelId}`}
        aria-expanded={open}
        tabIndex={0}
        aria-activedescendant={value ? `option-${value}` : ''}
        role="combobox"
        onKeyDown={handleKeyPress}
      >
        {selectedValueElement}
      </div>
      {open ? (
        <div
          role="listbox"
          aria-labelledby={labelId}
          className="dropdown-menu-options"
          id={`combobox-${labelId}`}
        >
          {elementsToRender}
        </div>
      ) : null}
    </div>
  );
}

export default DropdownMenu;
