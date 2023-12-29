import { ElementProps } from '../types/Element';
import { severity } from '../types/options';

export interface AlertProps extends ElementProps {
  children?: React.ReactNode;
  severity?: severity;
  icon?: React.ReactNode;
}
