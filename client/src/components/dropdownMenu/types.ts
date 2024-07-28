import { ElementProps } from '../types/Element';

export type RenderOption =
  | ((value: string) => React.ReactNode)
  | ((value: string, index: number) => React.ReactNode);

export interface DropdownMenuProps extends ElementProps {
  values: string[];

  /**
   * This prop determines how each option will look like. This can range
   * from simply displaying some content to things like
   * an individual icon for each option.
   *
   * Note that the provided render prop is also used as the display value
   * for the combobox (e.g. if the render prop features an icon before each
   * option, then the combobox will also have that icon).
   */
  renderOption: RenderOption;

  /**
   * Determines what the currently selected option is. By default, this is
   * the first value in ``values``, unless provided otherwise.
   */
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  labelId?: string;

  /**
   * By default, the combobox is as wide as the widest option.
   * When this prop is set to ``true``, the combobox is as wide as
   * the currently selected option's content.
   * This is useful in cases when you expect a particularly long option
   * (relative to the other ones) and don't want the combobox
   * to look awkward when a short one is selected.
   */
  autoWidth?: boolean;
}
