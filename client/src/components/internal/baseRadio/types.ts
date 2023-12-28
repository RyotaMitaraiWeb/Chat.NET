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
   * Use this if you want to set an initial checked state for an uncontrolled
   * radio button
   */
  defaultChecked?: boolean;
}
