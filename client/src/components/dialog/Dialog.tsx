import { createPortal } from 'react-dom';
import Box from '../box/Box';
import { DialogProps } from './types';
import Overlay from '../internal/overlay/Overlay';
import './Dialog.scss';
import { useEffect } from 'react';

/**
 * Conveys information to the user while disrupting their work.
 * The dialog blocks scrolling in the page (though you can scroll in the
 * dialog itself if its content overflows vertically),
 * but can be closed by clicking outside it
 * and potentially through buttons that are passed to it
 * and implement such logic. Note that the dialog is mounted
 * directly in the body via a portal.
 */
function Dialog(props: DialogProps): React.JSX.Element {
  const { className = '', children, open, onClose, ...others } = props;

  const body = document.body;
  function handleClose() {
    if (onClose) {
      onClose();
    }

    body.classList.remove('locked');
  }

  useEffect(() => {
    if (!body.classList.contains('locked') && open) {
      body.classList.add('locked');
    }
  }, [body.classList, open]);

  if (!open) {
    return <></>;
  }

  const dialog = createPortal(
    <div className={`component-dialog ${className}`} {...others}>
      <Box>{children}</Box>
      <Overlay onClose={handleClose} />
    </div>,
    document.body,
  );

  return dialog;
}

export default Dialog;
