import { act, fireEvent, render, screen } from '@testing-library/react';
import BaseModal from './BaseModal';
import { useState } from 'react';

function CustomComponent({ initialOpen }: { initialOpen: boolean }) {
  const [state, setState] = useState(initialOpen);

  return (
    <div>
      <button onClick={() => setState(true)}>Open dialog</button>
      <BaseModal open={state} onClose={() => setState(false)}>
        <p>test</p>
        <button id="state-test" onClick={() => setState(false)}>
          Close dialog
        </button>
      </BaseModal>
    </div>
  );
}

describe('BaseModal component', () => {
  beforeEach(() => {
    // Needed to stop FocusTrap from throwing errors in tests.
    process.env.NEXT_ENVIRONMENT = 'TESTING';
    jest.useFakeTimers();
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

      act(() => {
        jest.runAllTimers();
      });

      const modal = document.querySelector('.component-base-modal');
      expect(modal).toBeNull();
    });

    it('Closes when the overlay is clicked', () => {
      render(<CustomComponent initialOpen={true} />);
      const overlay = document.querySelector('.component-overlay')!;
      fireEvent.click(overlay);
      act(() => {
        jest.runAllTimers();
      });

      const modal = document.querySelector('.component-base-modal');
      expect(modal).toBeNull();
    });

    it('Opens and closes based on state', async () => {
      render(<CustomComponent initialOpen={false} />);
      const openButton = await screen.findByText(/Open dialog/im);
      act(() => openButton.click());

      const closeButton = await screen.findByText(/Close dialog/im);
      act(() => closeButton.click());

      act(() => {
        jest.runAllTimers();
      });

      const modal = document.querySelector('.component-base-modal');
      expect(modal).toBeNull();
    });
  });
});
