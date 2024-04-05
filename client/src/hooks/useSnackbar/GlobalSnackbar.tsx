import Snackbar from '@/features/snackbar/Snackbar';
import { severity } from '@/components/types/options';
import { SnackbarState } from '@/hooks/useSnackbar/types';

type GlobalSnackbarProps = {
  snackbar: SnackbarState;
  onClose: () => void;
  open: boolean;
  duration?: number;
  severity?: severity;
};

function GlobalSnackbar(props: GlobalSnackbarProps): React.JSX.Element {
  if (typeof props.snackbar === 'string') {
    return (
      <Snackbar
        severity={props.severity}
        onClose={props.onClose}
        open={props.open}
        duration={props.duration}
      >
        {props.snackbar}
      </Snackbar>
    );
  }

  return (
    <Snackbar
      snackbarTitle={props.snackbar.snackbarTitle}
      severity={props.severity}
      closeButtonText={props.snackbar.closeButtonText}
      open={props.open}
      onClose={props.onClose}
      duration={props.duration}
    >
      {props.snackbar.snackbarContent}
    </Snackbar>
  );
}

export default GlobalSnackbar;
