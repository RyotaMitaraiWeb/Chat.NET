'use client';
import { useEffect, useRef } from 'react';
import './DropdownMenu.scss';
import { DropdownMenuProps } from './types';
import { useOutsideClick } from '@/hooks/useOutsideClick/useOutsideClick';
import { useCombobox } from '@/hooks/useCombobox/useCombobox';
import { useDropdownMenuScroll } from '../internal/dropdownMenu/useDropdownMenuScroll';
import Combobox from './layout/combobox/Combobox';
import DropdownMenuLabel from './layout/label/DropdownLabel';
import DropdownListbox from './layout/listbox/DropdownListbox';
import DropdownRenderItem from './layout/renderItem/DropdownRenderItem';

/**
 * The dropdown menu is a rough implementation of the ``select`` tag, styled
 * for a better UX. The implementation follows most of the directions from
 * [the W3C's
 * APG website](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/)
 *
 * In particular, the following actions are possible with this dropdown:
 * - navigation with various keys, including up/down arrow, page up, page down,
 * home, end, and alphanumeric characters (for searching specific options).
 * - other operations with the keyboard, such as Escape, Enter, and Space
 * to open and/or close the listbox
 * - automatic scrolling when the listbox is opened, as well as when navigating
 * the box with the keyboard
 *
 * The dropdown currently has the following limitations:
 * - it can only be used as a controlled component, as it does not use ``select`` at all.
 * - it does not support multiple selections
 * - it does not support option groups
 * - it does not support disabling individual options
 * - it does not support a ``required`` attribute, as there will always be
 * a valid option selected
 */
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
      <DropdownRenderItem
        key={value}
        onClick={(event: React.MouseEvent | React.TouchEvent) => {
          onChange(value);
          setOpen(false);
          setFocusedValue(value);

          event.preventDefault();
          combobox.current?.focus();
        }}
        value={value}
        currentValue={props.value}
        focusedValue={focusedValue}
      >
        {element}
      </DropdownRenderItem>
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
      <DropdownMenuLabel label={label} labelId={labelId} onClick={toggleMenu} />
      <Combobox
        onClick={toggleMenu}
        open={open}
        onKeyDown={handleKeyDown}
        selectedValueElement={selectedValueElement}
        labelId={labelId}
        dropdownMenuRef={ref}
        autoWidth={autoWidth}
        ref={combobox}
        disabled={disabled}
      />
      <DropdownListbox elementsToRender={elementsToRender} labelId={labelId} open={open} />
    </div>
  );
}

export default DropdownMenu;
