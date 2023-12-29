import { createPortal } from 'react-dom';
import Alert from '../alert/Alert';
import { severity } from '../types/options';
import { SnackbarProps } from './types';
import './Snackbar.scss';
import '@/styles/colors.scss';

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
    duration = 7000,
    severity = 'success',
    snackbarTitle,
    closeButtonText,
    open,
    onClose,
    ...others
  } = props;

  function handleClose(event: React.MouseEvent) {
    event.preventDefault();
    if (onClose) {
      close();
    }
  }

  function close() {
    if (onClose) {
      onClose();
    }
  }

  if (!open) {
    return <></>;
  }

  return createPortal(
    <div className={`component-snackbar ${open ? 'open' : 'closed'} ${className}`} {...others}>
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
