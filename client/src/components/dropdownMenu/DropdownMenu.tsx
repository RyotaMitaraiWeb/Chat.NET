'use client';
import { useEffect, useRef } from 'react';
import './DropdownMenu.scss';
import { DropdownMenuProps } from './types';
import { useOutsideClick } from '@/hooks/useOutsideClick/useOutsideClick';
import { useCombobox } from '@/hooks/useCombobox/useCombobox';
import { useDropdownMenuScroll } from '../internal/dropdownMenu/useDropdownMenuScroll';
import Combobox from './layout/combobox/Combobox';

function parseValueIntoId(value: string) {
  return value.replace(/ /g, '-');
}

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
    autoWidth,
    ...others
  } = props;

  const { open, setOpen, focusedValue, setFocusedValue, handleKeyPress } = useCombobox({
    value,
    values,
    onChange,
  });

  const disabledClass = disabled ? 'disabled' : '';

  const userDefinedElements = (values as never[]).map(renderOption);
  const valueIndex = value ? values.indexOf(value) : 0;

  const selectedValueElement = userDefinedElements[valueIndex];
  const elementsToRender = values.map((value, index) => {
    const element = renderOption(value, index);
    return (
      <div
        key={value}
        id={`option-${parseValueIntoId(value)}`}
        data-value={value}
        className={`dropdown-menu-option
          ${props.value === value ? 'selected' : 'not-selected'}
          ${value === focusedValue ? 'focused' : 'not-focused'}`}
        aria-selected={props.value === value}
        role="option"
        onClick={(event: React.MouseEvent | React.TouchEvent) => {
          onChange(value);
          setOpen(false);
          setFocusedValue(value);

          event.preventDefault();
          combobox.current?.focus();
        }}
      >
        <div className="render-item">{element}</div>
      </div>
    );
  });

  function toggleMenu(event: React.MouseEvent) {
    event.preventDefault();

    if (!disabled) {
      if (open) {
        onChange(focusedValue);
      }

      setOpen((o) => !o);

      combobox.current?.focus();
    }
  }

  function closeByOutsideClick() {
    onChange(focusedValue);

    setOpen(false);
  }

  const ref = useRef<HTMLDivElement>(null);
  const combobox = useRef<HTMLElement>(null);
  useOutsideClick(ref, closeByOutsideClick);

  function handleKeyDown(event: React.KeyboardEvent | React.TouchEvent) {
    if (!disabled) {
      handleKeyPress(event as React.KeyboardEvent);
    }
  }

  useDropdownMenuScroll({ open, focusedValue, ref });

  // If disabled when listbox is opened, close and restart
  useEffect(() => {
    if (disabled) {
      setOpen(false);
      setFocusedValue(value || values[0]);
    }
  }, [disabled, setOpen, value, values, setFocusedValue]);

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
      <Combobox
        onClick={toggleMenu}
        open={open}
        onKeyDown={handleKeyDown}
        selectedValueElement={selectedValueElement}
        labelId={labelId}
        dropdownMenuRef={ref}
        autoWidth={autoWidth}
        ref={combobox}
      />
      <div className="listbox-container">
        <div
          role="listbox"
          aria-labelledby={labelId}
          className="dropdown-menu-options"
          id={`combobox-${labelId}`}
          style={{ visibility: open ? 'visible' : 'hidden' }}
        >
          {elementsToRender}
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;
