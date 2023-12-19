import { act, fireEvent, render, screen } from '@testing-library/react';
import Dialog from './Dialog';
import { useState } from 'react';

function CustomComponent({ initialOpen }: { initialOpen: boolean }) {
  const [state, setState] = useState(initialOpen);

  return (
    <div>
      <button onClick={() => setState(true)}>Open dialog</button>
      <Dialog open={state} onClose={() => setState(false)}>
        <button id="state-test" onClick={() => setState(false)}>
          Close dialog
        </button>
      </Dialog>
    </div>
  );
}

describe('Dialog component', () => {
  describe('Accessibility', () => {
    it('Focuses the first element possible when opened', () => {
      render(
        <Dialog open={true}>
          <p>This element should not be focused</p>
          <button id="test">Click me</button>
        </Dialog>,
      );

      const button = document.querySelector('#test');
      const activeElement = document.activeElement;
      expect(button).toEqual(activeElement);
    });

    it('Does not focus anything if there are no focusable elements', () => {
      render(
        <Dialog open={true}>
          <p>This element should not be focused</p>
        </Dialog>,
      );

      const activeElement = document.activeElement;
      expect(activeElement).toEqual(document.body);
    });
  });

  describe('Opening and closing', () => {
    it('Closes when the escape key is pressed', () => {
      render(<CustomComponent initialOpen={true} />);
      act(() => {
        fireEvent.keyDown(window, {
          key: 'Escape',
          code: 'Escape',
        });
      });

      const dialog = document.querySelector('.component-dialog');
      expect(dialog).toBeNull();
    });

    it('Closes when the overlay is clicked', () => {
      render(<CustomComponent initialOpen={true} />);
      const overlay = document.querySelector('.component-overlay')!;
      fireEvent.click(overlay);

      const dialog = document.querySelector('.component-dialog');
      expect(dialog).toBeNull();
    });

    it('Opens and closes based on state', async () => {
      render(<CustomComponent initialOpen={false} />);
      const openButton = await screen.findByText(/Open dialog/gim);
      act(() => openButton.click());

      const closeButton = await screen.findByText(/Close dialog/gim);
      act(() => closeButton.click());

      const dialog = document.querySelector('.component-dialog');
      expect(dialog).toBeNull();
    });
  });
});
