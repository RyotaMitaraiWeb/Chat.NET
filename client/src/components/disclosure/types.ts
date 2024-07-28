import { ElementProps } from '../types/Element';

export interface DisclosureProps extends ElementProps {
  label: string;
  open?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  padded?: boolean;
}
