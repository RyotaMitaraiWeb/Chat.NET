import { ElementProps } from '@/components/types/Element';

export interface BaseRadioProps extends ElementProps {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
  value?: string;
}
