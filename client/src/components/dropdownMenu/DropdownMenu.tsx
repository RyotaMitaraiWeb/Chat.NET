'use client';
import { useRef } from 'react';
import './DropdownMenu.scss';
import { DropdownMenuProps } from './types';
import { useOutsideClick } from '@/hooks/useOutsideClick/useOutsideClick';
import { useCombobox } from '@/hooks/useCombobox/useCombobox';

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
        id={`option-${value}`}
        className={`dropdown-menu-option
          ${props.value === value ? 'selected' : 'not-selected'}
          ${value === focusedValue ? 'focused' : 'not-focused'}`}
        aria-selected={props.value === value}
        role="option"
        onClick={() => {
          if (onChange) {
            onChange(value);
            setOpen(false);
            setFocusedValue(value);

            combobox.focus();
          }
        }}
      >
        {element}
      </div>
    );
  });

  function toggleMenu() {
    setOpen((o) => !o);
  }

  function closeByOutsideClick() {
    setOpen(false);
  }

  const ref = useRef<HTMLDivElement>(null);
  const combobox = ref.current?.querySelector('.dropdown-menu-selected-value') as HTMLElement;
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
