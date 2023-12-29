import { ElementProps } from '../types/Element';
import { severity } from '../types/options';

export interface SnackbarProps extends ElementProps {
  snackbarTitle?: React.ReactNode;
  children: React.ReactNode;
  closeButtonText?: React.ReactNode;
  duration?: number;
  severity?: severity;
  open?: boolean;
  onClose?: () => void;
}
