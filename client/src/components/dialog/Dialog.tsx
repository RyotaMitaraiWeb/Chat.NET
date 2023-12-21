import { DialogProps } from './types';
import './Dialog.scss';
import BaseModal from '../internal/baseModal/BaseModal';
/**
 * Conveys information to the user while disrupting their work.
 * The dialog blocks scrolling in the page (though you can scroll in the
 * dialog itself if its content overflows vertically),
 * but can be closed by clicking outside it, pressing the Escape key,
 * and potentially through buttons that are passed to it
 * and implement such logic. Note that the dialog is mounted
 * directly in the body via a portal.
 *
 * The dialog handles the automatic focusing on opening and closing, as
 * well as focus trapping.
 *
 * **Usage notes:** you may want to use the ``<DialogTitle>``, ``<DialogComponent>``,
 * and ``<DialogFooter>`` components to better describe the content
 * of your dialog. Some of those also come with some functionalities
 * and styling. You also need to have at least one focusable element
 * within ``children`` (such as a button or a hyperlink).
 *
 * **Accessibility notes:** you should always pass an appropriate ``role``
 * (e.g. ``alertdialog``) when using this component.
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
