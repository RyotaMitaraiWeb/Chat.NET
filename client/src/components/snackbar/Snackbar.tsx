'use client';
import { createPortal } from 'react-dom';
import Alert from '../alert/Alert';
import { severity } from '../types/options';
import { SnackbarProps } from './types';
import './Snackbar.scss';
import '@/styles/colors.scss';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce/useDebounce';

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
 * Changing the snackbar's title, severity, or its content while it is still up
 * will restart the timeout. This effect can be used to effectively
 * display a "different" snackbar if a second action that triggers it
 * occurs before the "first" snackbar disappears.
 *
 * Multiple snackbars can be displayed at the same time. In a list of snackbars,
 * the ones that were opened appear above the ones that were opened later.
 *
 * The snackbar is added to a special div intended for snackbars via a portal.
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

  /*
   * Used to trigger a closing animation before
   * the snackbar is unmounted from the DOM.
   */
  const [disappear, setDisappear] = useState('');
  const close = useCallback(() => {
    if (onClose) {
      setDisappear('disappear');
      setTimeout(() => {
        setDisappear('');
        onClose();
      }, 500);
    }
  }, [onClose]);

  const closeWithTimeout = useDebounce(() => {
    if (open) {
      close();
    }
  }, duration);

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

    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleEscape, open, close]);

  useEffect(() => {
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

  if (!open || !document) {
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
