import { ElementProps } from '@/components/types/Element';

export interface BaseCheckboxProps extends ElementProps {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
  value?: string;

  /**
   * Turns the checkbox into an uncontrolled component.
   */
  defaultChecked?: boolean;
}
