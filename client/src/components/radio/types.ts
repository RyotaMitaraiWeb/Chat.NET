import { BaseRadioProps } from '../internal/baseRadio/types';
import { palette, side, size } from '../types/options';

export interface RadioProps extends BaseRadioProps {
  children?: React.ReactNode;
  size?: size;

  /** Defaults to right. Determines how the label text is positioned
   * against the radio. Note that the positioning is only visual;
   * in the DOM, the label always appears before the radio.
   */
  side?: side;
  color?: palette;
}
