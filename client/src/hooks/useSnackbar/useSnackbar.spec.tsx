import { act, renderHook, screen } from '@testing-library/react';
import { SnackbarContextProvider, useSnackbar } from './useSnackbar';
import React from 'react';
import { SnackbarContext } from './types';

function CustomContextWrapper({ children }: { children: React.ReactNode }) {
  return <SnackbarContextProvider>{children}</SnackbarContextProvider>;
}

describe('useSnackbar', () => {
  let snackbarContext: SnackbarContext;
  beforeEach(() => {
    jest.useFakeTimers();
    renderHook(() => (snackbarContext = useSnackbar()), {
      wrapper: CustomContextWrapper,
    });
  });

  it('Displays a snackbar when passed a string successfully', async () => {
    snackbarContext.success('snackbar test');

    act(() => jest.runAllTimers());

    await screen.findByText('snackbar test');
  });

  it('Displays a snackbar when passed a special object successfully', async () => {
    snackbarContext.success({
      snackbarContent: 'hello',
      snackbarTitle: 'title',
      closeButtonText: 'close2',
    });

    act(() => jest.runAllTimers());

    await screen.findByText('hello');
    await screen.findByText('title');
    await screen.findByText('close2');
  });

  it('Displays correct snackbar based on severity', async () => {
    snackbarContext.error('something went wrong');

    act(() => jest.runAllTimers());

    await screen.findByText('Error!');
  });

  it('Replaces an opened snackbar', async () => {
    snackbarContext.info('Info');
    snackbarContext.warning('Warning');

    act(() => jest.runAllTimers());

    await screen.findByText('Warning!');

    const snackbars = document.querySelectorAll('.component-snackbar');
    expect(snackbars).toHaveLength(1);
  });

  // Clean up
  afterEach(() => (snackbarContext = undefined as unknown as SnackbarContext));
});
