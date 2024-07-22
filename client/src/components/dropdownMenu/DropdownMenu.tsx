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

  const userDefinedElements = (values as never[]).map(renderOption);
  const valueIndex = value ? values.indexOf(value) : 0;

  const selectedValueElement = userDefinedElements[valueIndex];
  const elementsToRender = values.map((value, index) => {
    const element = renderOption(value, index);
    return (
      <div
        key={value}
        id={`option-${value}`}
        className={`dropdown-menu-option ${props.value === value ? 'selected' : 'not-selected'}`}
        aria-selected={props.value === value}
        role="option"
        onClick={() => {
          if (onChange) {
            onChange(value);
            setOpen(false);
          }
        }}
      >
        {element}
      </div>
    );
  });

  function handleClick() {
    setOpen((o) => !o);
  }

  function closeByOutsideClick() {
    setOpen(false);
  }

  function handleKeyPress(event: React.KeyboardEvent) {
    if (event.key === 'Enter' || event.code === 'Space') {
      setOpen((o) => !o);
    } else if (event.key === 'Home' && !open) {
      setOpen(true);
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
        <div onClick={handleClick} id={labelId} className="dropdown-menu-label">
          {label}
        </div>
      ) : null}
      <div
        onClick={handleClick}
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
