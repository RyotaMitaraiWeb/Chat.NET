import { BaseRadioProps } from '../internal/baseRadio/types';
import { palette, side } from '../types/options';

export interface SwitchProps extends BaseRadioProps {
  side?: side;
  children?: React.ReactNode;

  /**
   * This is the color of the bar when the switch is checked. When not checked,
   * the bar will always be gray.
   *
   * Not passing a color will make the switch gray regardless of the state
   */
  color?: palette;

  /**
   * This is the icon that the switch will have when the switch is checked,
   * defaults to a simple circle.
   */
  iconOn?: React.ReactNode;

  /**
   * This is the icon that the switch will have when the switch is not checked,
   * defaults to a simple circle.
   */
  iconOff?: React.ReactNode;
}
