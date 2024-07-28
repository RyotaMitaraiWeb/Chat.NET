import { ElementProps } from '@/components/types/Element';

export interface DropdownLabelProps extends ElementProps {
  label?: React.ReactNode;
  onClick: (event: React.MouseEvent) => void;
  labelId: string;
}
