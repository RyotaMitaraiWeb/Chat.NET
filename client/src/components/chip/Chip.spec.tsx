import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chip from './Chip';

describe('Chip component', () => {
  describe('Delete button', () => {
    it('Triggers the onDelete callback when clicked', async () => {
      const fn = jest.fn();
      render(
        <Chip onDelete={fn} deleteButtonLabel="Remove this tag">
          Games
        </Chip>,
      );

      const deleteButton = await screen.findByLabelText('Remove this tag');
      act(() => deleteButton.click());

      expect(fn).toHaveBeenCalled();
    });
  });

  describe('Clickable', () => {
    it('Triggers the onDelete callback if backspace is pressed', async () => {
      const fn = jest.fn();
      const user = userEvent.setup();
      render(
        <Chip clickable onDelete={fn} deleteButtonLabel="Remove this tag">
          Games
        </Chip>,
      );

      const chip = screen.getByRole('button', { name: /Games/i });
      act(() => chip.focus());
      await user.keyboard('{Backspace}');

      expect(fn).toHaveBeenCalled();
    });

    it('Triggers the onDelete callback if delete is pressed', async () => {
      const fn = jest.fn();
      const user = userEvent.setup();
      render(
        <Chip clickable onDelete={fn} deleteButtonLabel="Remove this tag">
          Games
        </Chip>,
      );

      const chip = screen.getByRole('button', { name: /Games/i });
      act(() => chip.focus());
      await user.keyboard('{Delete}');

      expect(fn).toHaveBeenCalled();
    });
  });
});
