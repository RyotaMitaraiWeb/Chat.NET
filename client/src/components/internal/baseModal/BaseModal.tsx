import Box from '@/components/box/Box';
import { BaseModalProps } from '@/components/types/BaseModal';
import FocusTrap from 'focus-trap-react';
import Overlay from '../overlay/Overlay';
import { createPortal } from 'react-dom';
import { useCallback, useEffect, useState } from 'react';

/**
 * A base component for implementing modal components. Each modal:
 * * comes with an overlay and a ``<Box>`` container
 * * can be closed by clicking the overlay, pressing the Escape key,
 * and by changing the state that maintains the modal.
 * blocks interactions with other elements of the page while the modal
 * is opened.
 * * animates the opening and closing in a consistent manner regardless
 * of the method of opening or closing. The animations occur only
 * if the user's system allows it. For users that do not want animations,
 * there will be a small delay that lasts less than a second where they will be unable
 * to interact with the browser despite the modal and overlay having closed abruptly.
 *
 * * * The animation for the overlay consists of fading in and fading out, wheres
 * the animation of the model itself is left to a more specific component. The
 * implementing component's root selector will receive the ``closed`` class
 * which you can use to trigger a closing animation. Until then, the root
 * selector will have the class ``open``.
 * * implements a focus trap and automatically focuses the first focusable
 * element
 *
 * Each modal must have at least one focusable item (e.g. a hyperlink or a button)
 * within it. You should also provide an appropriate ``role`` for your modal
 * (e.g. ``alertdialog``).
 */
function BaseModal(props: BaseModalProps): React.JSX.Element {
  const { className = '', children, open, onClose, ...others } = props;
  const [isOpen, setOpen] = useState(open);
  const [overlayIsOpen, setOverlayOpen] = useState(true);

  const close = useCallback(() => {
    document.body.classList.remove('locked');
    setOverlayOpen(false);
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
      setOpen(false);
      setOverlayOpen(true);
    }, 200);
  }, [onClose]);

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        window.removeEventListener('keydown', handleEscape);
        close();
      }
    },
    [close],
  );

  const handleClose = useCallback(() => {
    window.removeEventListener('keydown', handleEscape);
    close();
  }, [handleEscape, close]);

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
