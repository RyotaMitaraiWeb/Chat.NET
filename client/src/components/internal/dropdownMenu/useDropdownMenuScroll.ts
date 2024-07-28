import { RefObject, useEffect } from 'react';

type useDropdownMenuScrollOptions = {
  open: boolean;
  ref: RefObject<HTMLElement>;
  focusedValue: string;
};

export const useDropdownMenuScroll = (options: useDropdownMenuScrollOptions) => {
  const { open, ref, focusedValue } = options;
  useEffect(() => {
    if (open) {
      const option = ref.current?.querySelector(`[data-value="${focusedValue}"]`);

      if (option) {
        option.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusedValue, open, ref]);
};
