import { ElementProps } from './Element';

export interface OverlayProps extends ElementProps {
  onClose?: () => void;
  open?: boolean;
}
