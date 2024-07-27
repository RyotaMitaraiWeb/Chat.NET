import { useEffect, useState } from 'react';

type useAdjustComboboxWidthOptions = {
  ref: React.RefObject<HTMLElement>;
  autoWidth?: boolean;
};

export const useAdjustComboboxWidth = (options: useAdjustComboboxWidthOptions) => {
  const { ref, autoWidth } = options;
  const [width, setWidth] = useState('auto');

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
          setWidth(`${highestWidth}px`);
        }
      } else {
        if (combobox) {
          setWidth('auto');
        }
      }
    }
  }, [autoWidth, ref]);

  return width;
};
