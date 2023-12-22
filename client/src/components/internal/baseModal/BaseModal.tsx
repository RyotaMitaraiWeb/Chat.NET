import Box from '@/components/box/Box';
import { BaseModalProps } from '@/components/types/BaseModal';
import FocusTrap from 'focus-trap-react';
import Overlay from '../overlay/Overlay';
import { createPortal } from 'react-dom';
import { useCallback, useEffect, useState } from 'react';

function BaseModal(props: BaseModalProps): React.JSX.Element {
  const { className = '', children, open, onClose, ...others } = props;
  const [isOpen, setOpen] = useState(open);
  const [overlayIsOpen, setOverlayOpen] = useState(true);

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        setOverlayOpen(false);
        setTimeout(() => {
          if (onClose) {
            onClose();
          }

          document.body.classList.remove('locked');
          window.removeEventListener('keydown', handleEscape);
          setOpen(false);
          setOverlayOpen(true);
        }, 200);
      }
    },
    [onClose],
  );

  const handleClose = useCallback(() => {
    document.body.classList.remove('locked');
    window.removeEventListener('keydown', handleEscape);
    setOverlayOpen(false);
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
      setOpen(false);
      setOverlayOpen(true);
    }, 200);
  }, [handleEscape, onClose]);

  useEffect(() => {
    if (!document.body.classList.contains('locked') && open) {
      document.body.classList.add('locked');
    }

    if (open) {
      window.addEventListener('keydown', handleEscape);
      setOpen(true);
    } else {
      window.removeEventListener('keydown', handleEscape);
      handleClose();
    }

    setOverlayOpen(open || false);
  }, [open, handleEscape, handleClose]);

  if (!isOpen) {
    return <></>;
  }

  const modal = createPortal(
    /* 
      FocusTrap does not work entirely in JSDom due to the way it's bundled,
      so providing this workaround
    */
    <FocusTrap active={process.env.NEXT_ENVIRONMENT !== 'TESTING'}>
      <div className={`component-base-modal ${className}`} {...others}>
        <Box selector="section" className={overlayIsOpen ? 'open' : 'closed'}>
          {children}
        </Box>
        <Overlay open={overlayIsOpen} onClose={handleClose} />
      </div>
    </FocusTrap>,
    document.body,
  );

  return modal;
}

export default BaseModal;
