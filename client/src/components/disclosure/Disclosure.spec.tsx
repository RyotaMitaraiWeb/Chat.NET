import { render, screen } from '@testing-library/react';
import Disclosure from './Disclosure';
import userEvent from '@testing-library/user-event';

describe('Disclosure', () => {
  describe('Opening and closing', () => {
    it('Toggles the disclosure successfully', async () => {
      render(<Disclosure label="toggle">Body</Disclosure>);

      const toggle = await screen.findByText('toggle');
      await userEvent.click(toggle);

      const body = await screen.findByText('Body');
      expect(body).toBeVisible();

      await userEvent.click(toggle);

      expect(body).not.toBeVisible();
    });

    it('Correctly displays open label and close label', async () => {
      render(
        <Disclosure openLabel="Close" closedLabel="Open">
          Body
        </Disclosure>,
      );

      const open = await screen.findByText('Open');
      await userEvent.click(open);

      const close = await screen.findByText('Close');

      const body = await screen.findByText('Body');
      expect(body).toBeVisible();

      await userEvent.click(close);

      expect(open).toBeVisible();
    });

    it('Correctly handles event listeners', async () => {
      const onOpen = jest.fn();
      const onClose = jest.fn();

      render(
        <Disclosure onOpen={onOpen} onClose={onClose} label="toggle">
          Body
        </Disclosure>,
      );

      const toggle = await screen.findByText('toggle');
      await userEvent.click(toggle);

      expect(onOpen).toHaveBeenCalledTimes(1);

      await userEvent.click(toggle);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('Correctly sets initial state', async () => {
      render(
        <Disclosure open label="toggle">
          Body
        </Disclosure>,
      );

      const toggle = await screen.findByText('toggle');
      const body = await screen.findByText('Body');
      expect(body).toBeVisible();

      await userEvent.click(toggle);

      expect(body).not.toBeVisible();
    });
  });
});
