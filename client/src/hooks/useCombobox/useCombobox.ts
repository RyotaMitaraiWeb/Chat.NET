import { useRef, useState } from 'react';
import { useDebounce } from '../useDebounce/useDebounce';
import { _keyPressMapper } from './_keyPressMapper';

export type ComboboxOptions = {
  value?: string;
  values: string[];
  onChange?: (value: string) => void;
};

export const useCombobox = (params: ComboboxOptions) => {
  const { value: selectedValue, values, onChange } = params;

  const firstValue = values[0];
  const lastValue = values[values.length - 1];

  const [focusedValue, setFocusedValue] = useState(selectedValue || firstValue);
  const index = values.indexOf(focusedValue);

  const [open, setOpen] = useState(false);

  const printableCharacters = useRef('');

  const debouncedClear = useDebounce(() => {
    printableCharacters.current = '';
  }, 200);

  function handleKeyPress(event: React.KeyboardEvent) {
    const keyboardEvent = _keyPressMapper(event, open);

    if (keyboardEvent.toggleWithMenuAndSpace) {
      setOpen((o) => !o);
      if (open && onChange) {
        onChange(focusedValue);
      }
    } else if (keyboardEvent.openWithArrowUp || keyboardEvent.openWithHome) {
      setOpen(true);
      setFocusedValue(firstValue);
    } else if (keyboardEvent.openWithEnd) {
      setOpen(true);
      setFocusedValue(lastValue);
    } else if (keyboardEvent.closeWithTab) {
      if (onChange) {
        onChange(focusedValue);
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
        setFocusedValue(matchingValue);
      }

      debouncedClear();
    } else if (keyboardEvent.closeWithEscape) {
      setOpen(false);
    } else if (keyboardEvent.moveDown) {
      if (index !== -1 && index < values.length - 1) {
        setFocusedValue(values[index + 1]);
      }
    } else if (keyboardEvent.moveUp) {
      if (index > 0) {
        setFocusedValue(values[index - 1]);
      }
    } else if (keyboardEvent.moveToFirstValue) {
      setFocusedValue(firstValue);
    } else if (keyboardEvent.moveToLastValue) {
      setFocusedValue(lastValue);
    } else if (keyboardEvent.moveTenOptionsAhead) {
      if (index + 10 >= values.length) {
        setFocusedValue(lastValue);
      } else {
        setFocusedValue(values[index + 10]);
      }
    } else if (keyboardEvent.moveTenOptionsBehind) {
      if (index < 10) {
        setFocusedValue(firstValue);
      } else {
        setFocusedValue(values[index - 10]);
      }
    }
  }

  return { focusedValue, setFocusedValue, open, setOpen, handleKeyPress };
};
