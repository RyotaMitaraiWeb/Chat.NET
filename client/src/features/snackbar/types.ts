import { ElementProps } from '../../components/types/Element';
import { severity } from '../../components/types/options';

export interface SnackbarProps extends ElementProps {
  snackbarTitle?: React.ReactNode;
  children: React.ReactNode;
  closeButtonText?: React.ReactNode;
  /**
   * Expressed in miliseconds. If not specified, the snackbar becomes
   * persistent, disappearing only after the user explicitly closes it.
   */
  duration?: number;
  severity?: severity;
  open?: boolean;
  onClose?: () => void;
}
