'use client';
import { createPortal } from 'react-dom';
import Alert from '../../components/alert/Alert';
import { severity } from '../../components/types/options';
import { SnackbarProps } from './types';
import './Snackbar.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { isBrowser } from '@/util/isBrowser/isBrowser';
import { performAnimation } from '@/util/performAnimation/performAnimation';

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
 * To display a snackbar, it is best to use the ``useSnackbar`` hook.
 *
 * The snackbar component clears out any timeouts it creates, preventing
 * memory leaks and stopping side effects from occurring after it's unmounted.
 *
 * Changing the snackbar's title, severity, or its content while it is still up
 * will restart the timeout.
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

  const ref = useRef<ReturnType<typeof setTimeout>>();

  /*
   * Used to trigger a closing animation before
   * the snackbar is unmounted from the DOM.
   */
  const [disappear, setDisappear] = useState('');
  const close = useCallback(() => {
    if (onClose) {
      setDisappear('disappear');
      performAnimation(
        () => {
          setDisappear('');
          onClose();
        },
        { timeout: 500 },
      );
    }
  }, [onClose]);

  const closeWithTimeout = useCallback(() => {
    ref.current = setTimeout(() => {
      if (open) {
        close();
      }
    }, duration);
  }, [open, close, duration]);

  function handleClose(event: React.MouseEvent) {
    event.preventDefault();
    close();
  }

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    },
    [close],
  );

  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      clearTimeout(ref.current);
    };
  }, [handleEscape, open, close]);

  useEffect(() => {
    clearTimeout(ref.current);
    if (open && !disappear) {
      if (duration) {
        closeWithTimeout();
      }
    }
  }, [
    duration,
    disappear,
    closeWithTimeout,
    open,
    handleEscape,
    snackbarTitle,
    children,
    severity,
  ]);

  if (!open || !isBrowser()) {
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
          <button className="snackbar-close-button" onClick={handleClose}>
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
