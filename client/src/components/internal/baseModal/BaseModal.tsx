import Box from '@/components/box/Box';
import { BaseModalProps } from '@/components/types/BaseModal';
import FocusTrap from 'focus-trap-react';
import Overlay from '../overlay/Overlay';
import { createPortal } from 'react-dom';
import { useCallback, useEffect } from 'react';

function BaseModal(props: BaseModalProps): React.JSX.Element {
  const { className = '', children, open, onClose, ...others } = props;
  function handleClose() {
    if (onClose) {
      onClose();
    }

    document.body.classList.remove('locked');
    window.removeEventListener('keydown', handleEscape);
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

    if (open) {
      window.addEventListener('keydown', handleEscape);
    } else {
      window.removeEventListener('keydown', handleEscape);
    }
  }, [open, handleEscape]);

  if (!open) {
    return <></>;
  }

  const modal = createPortal(
    /* 
      FocusTrap does not work entirely in JSDom due to the way it's bundled,
      so providing this workaround
    */
    <FocusTrap active={process.env.NEXT_ENVIRONMENT !== 'TESTING'}>
      <div className={`component-base-modal ${className}`} {...others}>
        <Box selector="section">{children}</Box>
        <Overlay onClose={handleClose} />
      </div>
    </FocusTrap>,
    document.body,
  );

  return modal;
}

export default BaseModal;
