import { BaseRadioProps } from '../internal/baseRadio/types';
import { palette, side } from '../types/options';

export interface SwitchProps extends BaseRadioProps {
  side?: side;
  children?: React.ReactNode;
  color?: palette;
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
}
