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
        timeoutFn.current = () => {};
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
