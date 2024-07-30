'use client';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { SnackbarContext, SnackbarState } from './types';
import { severities } from '@/constants/severity';
import { severity } from '@/components/types/options';
import GlobalSnackbar from './GlobalSnackbar';
import { performAnimation } from '@/util/performAnimation/performAnimation';

const SnackbarContext = createContext({} as SnackbarContext);

function isEmpty(snackbar: SnackbarState): boolean {
  if (typeof snackbar === 'string') {
    return snackbar === '';
  }

  return Object.keys(snackbar).length === 0;
}

export function SnackbarContextProvider({ children }: { children: React.ReactNode }) {
  const [snackbar, setSnackbar] = useState<SnackbarState>('');
  const [duration, setDuration] = useState<number | undefined>(0);
  const [severity, setSeverity] = useState<severity | undefined>();

  function closeSnackbar() {
    setSnackbar('');
  }

  const displaySnackbar = useCallback(
    (snackbarInput: SnackbarState, severity: severity, open: boolean, duration?: number) => {
      if (open) {
        closeSnackbar();
        performAnimation(
          () => {
            displaySnackbar(snackbarInput, severity, !open, duration);
          },
          { timeout: 200 },
        );
      } else {
        setSnackbar(snackbarInput);
        setDuration(duration);
        setSeverity(severity);
      }
    },
    [],
  );

  const methods = useMemo(
    () =>
      severities.reduce((methods, severity) => {
        const copy = { ...methods };
        copy[severity] = (snackbarInput: SnackbarState, duration?: number) =>
          displaySnackbar(snackbarInput, severity, isEmpty(snackbar), duration);
        return copy;
      }, {} as SnackbarContext),
    [displaySnackbar, snackbar],
  );

  return (
    <SnackbarContext.Provider value={methods}>
      {children}
      <GlobalSnackbar
        snackbar={snackbar}
        onClose={closeSnackbar}
        open={!isEmpty(snackbar)}
        duration={duration}
        severity={severity}
      />
    </SnackbarContext.Provider>
  );
}

/**
 * A hook that allows you to display snackbars.
 *
 * Each method corresponds to one of the severities. You
 * can pass either a string (which is injected as the content)
 * or an object that specifies the content, title, and close button text.
 * Additionally, you can pass a duration in miliseconds; not passing
 * duration makes the snackbar persistent, remaining visible until the user
 * explicitly closes it.
 *
 * If you attempt to open a snackbar while one is already displayed,
 * the current one will be closed and the second one will be displayed instead.
 * @returns an object with methods to display the snackbar
 */
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  return context;
};
