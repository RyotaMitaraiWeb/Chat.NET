import { act, render, screen } from '@testing-library/react';
import Home from './page';

describe('Test', () => {
  it('works', () => {
    expect(1 + 1).toBe(2);
  });

  it('renders', async () => {
    render(<Home />);
    const button = await screen.findByText(/Click me/im);
    act(() => button.click());

    await screen.findByText(/The count is 1/im);
  });

  it('cleans up', async () => {
    render(<Home />);
    const button = await screen.findByText(/Click me/im);
    act(() => {
      button.click();
    });

    act(() => {
      button.click();
    });

    await screen.findByText(/The count is 2/im);
  });
});
