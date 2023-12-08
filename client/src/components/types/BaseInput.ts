import { HTMLInputTypeAttribute } from 'react';
import { ElementProps } from './Element';

export type inputType = HTMLInputTypeAttribute;

/** Props representing the standard ``input`` attributes applicable to all variants */
export interface BaseInputProps extends ElementProps {
  name?: string;
  disabled?: boolean;
  form?: string;
}

export interface HelperTextProps {
  helperText?: string;
}
