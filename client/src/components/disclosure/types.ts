import { ElementProps } from '../types/Element';

export interface DisclosureProps extends ElementProps {
  label: string;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  children: React.ReactNode;
  padded?: boolean;
  openLabel?: string;
  closedLabel?: string;
}
