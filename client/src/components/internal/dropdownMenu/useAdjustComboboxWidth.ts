import { useEffect } from 'react';

type useAdjustComboboxWidthOptions = {
  ref: React.RefObject<HTMLElement>;
  autoWidth?: boolean;
  values: string[];
};

export const useAdjustComboboxWidth = (options: useAdjustComboboxWidthOptions) => {
  const { ref, autoWidth, values } = options;
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
  }, [values, autoWidth, ref]);
};
