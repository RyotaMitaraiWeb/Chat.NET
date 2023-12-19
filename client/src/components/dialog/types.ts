import { ElementProps } from '../types/Element';

export interface DialogProps extends ElementProps {
  children: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
}
