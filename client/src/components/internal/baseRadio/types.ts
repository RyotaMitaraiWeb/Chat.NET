import { ElementProps } from '@/components/types/Element';

export interface BaseRadioProps extends ElementProps {
  /**
   * Turns the radio button into a controlled component
   */
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
  value?: string;

  /**
   * Turns the radio button into an uncontrolled component
   */
  defaultChecked?: boolean;
}
