import { DialogProps } from './types';
import './Dialog.scss';
import BaseModal from '../internal/baseModal/BaseModal';
/**
 * Conveys information to the user while disrupting their work. Can be
 * used to present content or provide possible actions to the user.
 *
 * **Usage notes:** you may want to use the ``<DialogTitle>``, ``<DialogComponent>``,
 * and ``<DialogFooter>`` components to better describe the content
 * of your dialog. Some of those also come with some functionalities
 * and styling.
 */
function Dialog(props: DialogProps): React.JSX.Element {
  const { className = '', children, open, onClose, ...others } = props;
  return (
    <BaseModal
      open={open}
      onClose={onClose}
      className={`component-dialog ${className}`}
      {...others}
    >
      {children}
    </BaseModal>
  );
}

export default Dialog;
