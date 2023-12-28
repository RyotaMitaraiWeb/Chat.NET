import { ElementProps } from '@/components/types/Element';

export interface BaseCheckboxProps extends ElementProps {
  /**
   * Turns the checkbox into a controlled component
   */
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
  value?: string;

  /**
   * Use this if you want to set an initial checked state for an uncontrolled
   * checkbox
   */
  defaultChecked?: boolean;
}
