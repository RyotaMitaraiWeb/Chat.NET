import { createPortal } from 'react-dom';
import Box from '../box/Box';
import { DialogProps } from './types';
import Overlay from '../internal/overlay/Overlay';
import './Dialog.scss';
import { useCallback, useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
/**
 * Conveys information to the user while disrupting their work.
 * The dialog blocks scrolling in the page (though you can scroll in the
 * dialog itself if its content overflows vertically),
 * but can be closed by clicking outside it, pressing the Escape key,
 * and potentially through buttons that are passed to it
 * and implement such logic. Note that the dialog is mounted
 * directly in the body via a portal.
 *
 * The dialog handles the automatic focusing on opening and closing.
 *
 * **Accessibility notes:** you should always pass an appropriate ``role``
 * (e.g. ``alertdialog``) when using this component.
 */
function Dialog(props: DialogProps): React.JSX.Element {
  const { className = '', children, open, onClose, ...others } = props;
  function handleClose() {
    if (onClose) {
      onClose();
    }

    document.body.classList.remove('locked');
  }

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        if (onClose) {
          onClose();
        }

        document.body.classList.remove('locked');
        window.removeEventListener('keydown', handleEscape);
      }
    },
    [onClose],
  );
  useEffect(() => {
    if (!document.body.classList.contains('locked') && open) {
      document.body.classList.add('locked');
    }

    window.addEventListener('keydown', handleEscape);
  }, [open, handleEscape]);

  if (!open) {
    return <></>;
  }

  const dialog = createPortal(
    <FocusTrap>
      <div className={`component-dialog ${className}`} {...others}>
        <Box>{children}</Box>
        <Overlay onClose={handleClose} />
      </div>
    </FocusTrap>,
    document.body,
  );

  return dialog;
}

export default Dialog;
