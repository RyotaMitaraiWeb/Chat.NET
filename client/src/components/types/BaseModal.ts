import { ElementProps } from './Element';

export interface BaseModalProps extends ElementProps {
  children: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
}
