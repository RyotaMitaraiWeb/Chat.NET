import { BaseModalProps } from '../types/BaseModal';
import { side } from '../types/options';

export interface DrawerProps extends BaseModalProps {
  side?: side;
}
