import { severity } from '@/components/types/options';

type SnackbarData = {
  snackbarTitle?: React.ReactNode;
  snackbarContent?: React.ReactNode;
  closeButtonText?: React.ReactNode;
};

export type SnackbarState = string | SnackbarData;

type SnackbarSeverityMethod = (snackbar: SnackbarState, duration?: number) => void;
export interface SnackbarContext extends Record<severity, SnackbarSeverityMethod> {}
