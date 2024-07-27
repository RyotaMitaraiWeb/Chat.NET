import { ElementProps } from '@/components/types/Element';

export interface DropdownListboxProps extends ElementProps {
  labelId: string;
  open: boolean;
  elementsToRender: React.ReactNode[];
}
