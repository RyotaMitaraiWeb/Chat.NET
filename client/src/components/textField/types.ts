import { BaseInputProps } from '../types/BaseInput';
import { size } from '../types/options';

export interface TextFieldProps extends BaseInputProps {
  /**
   * Defaults to ``text`` if not passed. Turns the field
   * into a ``<textarea>`` if ``autoresize`` is ``true``
   */
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  list?: string;
  placeholder?: string;
  readonly?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  size?: size;

  /**
   * Initial value
   */
  value: string;

  /**
   * If passed to a ``text`` field, this will make the field
   * adjust its height based on the content.
   */
  autoresize?: boolean;
}
