import { ElementProps } from '@/components/types/Element';

export interface ComboboxProps extends ElementProps {
  onClick: (event: React.MouseEvent) => void;
  open: boolean;
  disabled?: boolean;
  onKeyDown: React.KeyboardEventHandler;
  selectedValueElement: React.ReactNode;
  labelId: string;
  dropdownMenuRef: React.RefObject<HTMLElement>;
  autoWidth?: boolean;
  focusedValue: string;
}
