import { BaseRadioProps } from '../internal/baseRadio/types';
import { side } from '../types/options';

export interface SwitchProps extends BaseRadioProps {
  side?: side;
  children?: React.ReactNode;
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
}
