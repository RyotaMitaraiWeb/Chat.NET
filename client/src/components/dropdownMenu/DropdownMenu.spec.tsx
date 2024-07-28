import { render, screen } from '@testing-library/react';
import DropdownMenu from './DropdownMenu';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

const memberStates = [
  'Austria',
  'Belgium',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Ireland',
  'Italy',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Poland',
  'Portugal',
  'Romania',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
];

describe('DropdownMenu', () => {
  describe('Opening and closing (standard behavior)', () => {
    it('Opens successfully and closes when an option is selected', async () => {
      const fn = jest.fn();
      render(
        <DropdownMenu
          renderOption={(value: string) => <span>{value}</span>}
          values={memberStates}
          onChange={fn}
          labelId="eu-member-states"
        />,
      );

      const menu = await screen.findByRole('combobox');
      await userEvent.click(menu);
      const option = await screen.findByRole('option', {
        name: 'Bulgaria',
      });
      await userEvent.click(option);

      expect(option).not.toBeVisible();
    });

    it('Opens and closes when clicked by the label and correctly sets the value', async () => {
      const fn = jest.fn();
      render(
        <DropdownMenu
          renderOption={(value: string) => <span>{value}</span>}
          values={memberStates}
          onChange={fn}
          labelId="eu-member-states"
          label="Select an EU member state"
        />,
      );

      const label = await screen.findByText('Select an EU member state');
      await userEvent.click(label);

      const option = await screen.findByRole('option', {
        name: 'Bulgaria',
      });

      await userEvent.keyboard('{ArrowDown}');

      await userEvent.click(label);
      expect(option).not.toBeVisible();
      expect(fn).toHaveBeenCalledWith('Belgium');
    });

    it('Closes when clicked outside and sets correct value', async () => {
      const fn = jest.fn();
      render(
        <>
          <button>Off-topic content</button>
          <DropdownMenu
            renderOption={(value: string) => <span>{value}</span>}
            values={memberStates}
            onChange={fn}
            labelId="eu-member-states"
          />
        </>,
      );

      const menu = await screen.findByRole('combobox');
      await userEvent.click(menu);

      const option = await screen.findByRole('option', {
        name: 'Bulgaria',
      });

      await userEvent.keyboard('{ArrowDown}');
      const button = await screen.findByText(/Off-topic/i);
      await userEvent.click(button);

      expect(option).not.toBeVisible();

      expect(fn).toHaveBeenCalledWith('Belgium');
    });

    it('Closes when disabled state is changed to true and restarts the focused value', async () => {
      render(<StatefulDropdown />);

      const menu = await screen.findByRole('combobox');
      await userEvent.click(menu);

      const option = await screen.findByRole('option', {
        name: 'Bulgaria',
      });

      await userEvent.keyboard('{Home}');

      const disableButton = await screen.findByText('Disable');
      await userEvent.click(disableButton);

      expect(option).not.toBeVisible();
      const values = await screen.findAllByText('Malta');
      expect(values).toHaveLength(2);
      await userEvent.click(disableButton);
      await userEvent.click(menu);

      const focused = document.querySelector('.focused');
      expect(focused?.textContent?.includes('Malta')).toBe(true);
    });

    it('Does not open when disabled', async () => {
      const fn = jest.fn();

      render(
        <DropdownMenu
          renderOption={(value: string) => <span>{value}</span>}
          values={memberStates}
          onChange={fn}
          labelId="eu-member-states"
          disabled={true}
        />,
      );

      const menu = await screen.findByRole('combobox');
      await userEvent.click(menu);

      const option = document.querySelector('[role="option"]');
      expect(option).not.toBeVisible();
    });
  });
});

function StatefulDropdown() {
  const [disabled, setDisabled] = useState(false);
  const fn = jest.fn();

  return (
    <>
      <button onClick={() => setDisabled((d) => !d)}>Disable</button>
      <DropdownMenu
        value="Malta"
        renderOption={(value: string) => <span>{value}</span>}
        values={memberStates}
        onChange={fn}
        labelId="eu-member-states"
        disabled={disabled}
      />
    </>
  );
}
