'use client';
import { useRef, useState } from 'react';
import './DropdownMenu.scss';
import { DropdownMenuProps } from './types';
import { useOutsideClick } from '@/hooks/useOutsideClick/useOutsideClick';
import { _keyPressMapper } from './_keyPressMapper';
import { useDebounce } from '@/hooks/useDebounce/useDebounce';

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

  function handleKeyPress(event: React.KeyboardEvent) {
    const keyboardEvent = _keyPressMapper(event, open);

    if (keyboardEvent.toggleWithMenuAndSpace) {
      setOpen((o) => !o);
      if (open && onChange) {
        onChange(temporarySelectValue);
      }
    } else if (keyboardEvent.openWithArrowUp || keyboardEvent.openWithHome) {
      setOpen(true);
      setTemporarySelectValue(firstValue);
    } else if (keyboardEvent.openWithEnd) {
      setOpen(true);
      setTemporarySelectValue(lastValue);
    } else if (keyboardEvent.closeWithTab) {
      if (onChange) {
        onChange(temporarySelectValue);
      }

      setOpen(false);
    } else if (keyboardEvent.openWithArrowDown || keyboardEvent.openWithAltArrowDown) {
      setOpen(true);
    } else if (keyboardEvent.openWithPrintableCharacters) {
      setOpen(true);

      printableCharacters.current += event.key;
      const matchingValue = values.find((v) =>
        v.toLowerCase().startsWith(printableCharacters.current.toLowerCase()),
      );

      if (matchingValue) {
        setTemporarySelectValue(matchingValue);
      }

      debouncedClear();
    } else if (keyboardEvent.closeWithEscape) {
      setOpen(false);
    } else if (keyboardEvent.moveDown) {
      const index = values.indexOf(temporarySelectValue);
      if (index !== -1 && index < values.length - 1) {
        setTemporarySelectValue(values[index + 1]);
      }
    } else if (keyboardEvent.moveUp) {
      const index = values.indexOf(temporarySelectValue);
      if (index > 0) {
        setTemporarySelectValue(values[index - 1]);
      }
    } else if (keyboardEvent.moveToFirstValue) {
      setTemporarySelectValue(firstValue);
    } else if (keyboardEvent.moveToLastValue) {
      setTemporarySelectValue(lastValue);
    }
  }

  const ref = useRef<HTMLDivElement>(null);
  const combobox = ref.current?.querySelector('.dropdown-menu-selected-value') as HTMLElement;
  useOutsideClick(ref, closeByOutsideClick);

  const printableCharacters = useRef('');

  const debouncedClear = useDebounce(() => {
    printableCharacters.current = '';
  }, 200);

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
