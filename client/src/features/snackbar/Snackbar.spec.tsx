import { act, fireEvent, render, screen } from '@testing-library/react';
import Snackbar from './Snackbar';
import { useState } from 'react';

function CustomSnackbarUpdateWrapper({ testFn }: { testFn: () => void }) {
  const [title, setTitle] = useState('snackbar');
  return (
    <>
      <button onClick={() => setTitle('test')}>Update</button>
      <Snackbar onClose={testFn} open={true} snackbarTitle={title} duration={10_000}>
        Content
      </Snackbar>
    </>
  );
}

describe('Snackbar', () => {
  beforeEach(() => jest.useFakeTimers());

  it('triggers the close handler when the close button is clicked', async () => {
    const testFn = jest.fn();
    render(
      <Snackbar open={true} onClose={testFn}>
        Snackbar content
      </Snackbar>,
    );

    const closeBtn = await screen.findByText(/Close/);
    act(() => closeBtn.click());
    act(() => jest.runAllTimers());

    expect(testFn).toHaveBeenCalledTimes(1);
  });

  it('triggers the close handler when Escape is pressed', async () => {
    const testFn = jest.fn();
    render(
      <Snackbar open={true} onClose={testFn}>
        Snackbar content
      </Snackbar>,
    );

    act(() => {
      fireEvent.keyDown(window, {
        key: 'Escape',
        code: 'Escape',
      });
    });
    act(() => jest.runAllTimers());

    expect(testFn).toHaveBeenCalledTimes(1);
  });

  it('triggers the close handler when the snackbar times out', () => {
    const testFn = jest.fn();
    render(
      <Snackbar duration={10_000} open={true} onClose={testFn}>
        Snackbar content
      </Snackbar>,
    );

    act(() => jest.advanceTimersByTime(12_000));

    expect(testFn).toHaveBeenCalledTimes(1);
  });

  it('Restarts timeout if the snackbar is updated in one of the relevant areas', async () => {
    const testFn = jest.fn();
    render(<CustomSnackbarUpdateWrapper testFn={testFn} />);

    act(() => jest.advanceTimersByTime(9_000));

    const btn = await screen.findByText(/Update/i);
    act(() => btn.click());

    act(() => jest.advanceTimersByTime(3_000));
    expect(testFn).not.toHaveBeenCalled();

    act(() => jest.advanceTimersByTime(9_000));
    expect(testFn).toHaveBeenCalled();
  });
});
