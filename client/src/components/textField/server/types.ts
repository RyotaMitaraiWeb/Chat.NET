import { BaseInputProps } from '@/components/types/BaseInput';
import { size } from '@/components/types/options';

export interface ServerTextFieldProps extends BaseInputProps {
  /**
   * Defaults to ``text`` if not passed.
   */
  type?: 'text' | 'number';
  required?: boolean;
  list?: string;
  placeholder?: string;
  readonly?: boolean;
  size?: size;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;

  /**
   * Initial value
   */
  value?: string;

  /**
   * Appears on the top of the text field
   */
  label?: string;

  /**
   * Appears below the text field.
   */
  helperText?: string;
  step?: number;
}
