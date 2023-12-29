import { createPortal } from 'react-dom';
import Alert from '../alert/Alert';
import { severity } from '../types/options';
import { SnackbarProps } from './types';
import './Snackbar.scss';
import '@/styles/colors.scss';
import { useCallback, useEffect, useRef, useState } from 'react';

const titles: Record<severity, string> = {
  success: 'Success!',
  info: 'Info',
  error: 'Error!',
  warning: 'Warning!',
};

/**
 * A snackbar appears around the bottom of the screen to alert or inform
 * the user about something. The snackbar is persistent until the user
 * closes it, unless a ``duration`` is passed. The user can close
 * the snackbar by pressing Escape or by clicking the close button
 * (assuming you have passed an ``onClose`` handler). ``duration``
 * is passed in miliseconds.
 *
 * The snackbar component clears out any timeouts it creates, preventing
 * memory leaks and stopping side effects from occurring after it's unmounted.
 * However, you should still avoid defining side effects outside
 * of ones involving the closing of the snackbar.
 *
 * The snackbar is added to the body of the document through a portal.
 *
 * **Note:** if the user does not allow animations on their system,
 * the snackbar will be transparent for less than a second when closed.
 * However, this has virtually no effect for the user.
 */
function Snackbar(props: SnackbarProps): JSX.Element {
  const {
    className = '',
    children,
    duration,
    severity = 'success',
    snackbarTitle,
    closeButtonText,
    open,
    onClose,
    ...others
  } = props;

  const timeoutFn = useRef<unknown>(undefined);

  /**
   * Used to trigger a closing animation before
   * the snackbar is unmounted from the DOM.
   */
  const [disappear, setDisappear] = useState('');

  function handleClose(event: React.MouseEvent) {
    event.preventDefault();
    close();
  }

  const closebByEscape = useCallback(() => {
    if (onClose && timeoutFn.current) {
      setDisappear('disappear');
      setTimeout(() => {
        setDisappear('');
        onClose();
        window.clearTimeout(timeoutFn.current as number | undefined);
      }, 500);
    }

    window.removeEventListener('keydown', closebByEscape);
  }, [onClose]);

  const close = useCallback(() => {
    if (onClose && timeoutFn.current) {
      setDisappear('disappear');
      setTimeout(() => {
        setDisappear('');
        onClose();
        window.clearTimeout(timeoutFn.current as number | undefined);
      }, 500);
    }

    window.removeEventListener('keydown', closebByEscape);
  }, [onClose, timeoutFn, closebByEscape]);

  useEffect(() => {
    if (open && !disappear) {
      if (duration) {
        /**
         * Track the current timeout so that it can be
         * cleared out later on, preventing memory leaks
         * and unnecessary side effects
         */
        timeoutFn.current = setTimeout(close, duration);
      } else {
        timeoutFn.current = setTimeout(() => {}, 0);
      }
      window.addEventListener('keydown', closebByEscape);
    }

    return () => {
      timeoutFn.current = undefined;
    };
  }, [open, close, duration, disappear, closebByEscape]);

  if (!open) {
    return <></>;
  }

  return createPortal(
    <div
      className={`component-snackbar ${open ? 'open' : 'closed'} ${disappear} ${className}`}
      {...others}
    >
      <Alert
        alertTitle={snackbarTitle || titles[severity]}
        severity={severity}
        alertActions={
          <button className="snackbar-close-button contrast-text-color" onClick={handleClose}>
            {closeButtonText || 'Close'}
          </button>
        }
      >
        {children}
      </Alert>
    </div>,
    document.body,
  );
}

export default Snackbar;
