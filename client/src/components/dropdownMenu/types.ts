import { ElementProps } from '../types/Element';

type RenderOption =
  | ((value: string) => React.ReactNode)
  | ((value: string, index: number) => React.ReactNode);

export interface DropdownMenuProps extends ElementProps {
  values: string[];
  renderOption: RenderOption;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  labelId: string;
}
