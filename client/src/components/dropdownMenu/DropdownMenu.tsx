'use client';
import { useEffect, useRef } from 'react';
import './DropdownMenu.scss';
import { DropdownMenuProps } from './types';
import { useOutsideClick } from '@/hooks/useOutsideClick/useOutsideClick';
import { useCombobox } from '@/hooks/useCombobox/useCombobox';
import Icon from '../icon/Icon';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

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

  // If disabled when listbox is opened, close and restart
  useEffect(() => {
    if (disabled) {
      setOpen(false);
      setFocusedValue(value || values[0]);
    }
  }, [disabled, setOpen, value, values, setFocusedValue]);

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
          const combobox = ref.current?.querySelector(
            '.dropdown-menu-selected-value',
          ) as HTMLElement | null;
          combobox?.focus();
        }}
      >
        <div className="render-item">{element}</div>
      </div>
    );
  });

  function toggleMenu(event: React.MouseEvent) {
    event.preventDefault();

    if (!disabled) {
      if (open && onChange) {
        onChange(focusedValue);
      }

      setOpen((o) => !o);

      const combobox = ref.current?.querySelector(
        '.dropdown-menu-selected-value',
      ) as HTMLElement | null;
      combobox?.focus();
    }
  }

  function closeByOutsideClick() {
    onChange(focusedValue);

    setOpen(false);
  }

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, closeByOutsideClick);

  function handleKeyDown(event: React.KeyboardEvent | React.TouchEvent) {
    if (!disabled) {
      handleKeyPress(event as React.KeyboardEvent);
    }
  }

  useEffect(() => {
    if (open) {
      const option = ref.current?.querySelector(`[data-value="${focusedValue}"]`);

      if (option) {
        option.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusedValue, open]);

  useEffect(() => {
    if (ref.current) {
      const combobox = ref.current.querySelector('[role="combobox"]') as HTMLElement | null;
      if (!autoWidth) {
        const options = ref.current?.querySelectorAll('.dropdown-menu-option');
        const highestWidth = Array.from(options).reduce(
          (current, o) => Math.max(current, o.clientWidth),
          0,
        );

        if (combobox) {
          combobox.style.width = `${highestWidth}px`;
        }
      } else {
        if (combobox) {
          combobox.style.width = 'auto';
        }
      }
    }
  }, [values, autoWidth]);

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
        className={`dropdown-menu-selected-value ${open ? 'open' : 'closed'}`}
        aria-controls={`combobox-${labelId}`}
        aria-expanded={open}
        tabIndex={disabled ? -1 : 0}
        aria-activedescendant={value ? `option-${value}` : ''}
        role="combobox"
        onKeyDown={handleKeyDown}
      >
        <div className="dropdown-value">{selectedValueElement}</div>
        <Icon size="large" className="dropdown-icon" aria-hidden={true}>
          {!open ? <MdArrowDropDown /> : <MdArrowDropUp />}
        </Icon>
      </div>
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
