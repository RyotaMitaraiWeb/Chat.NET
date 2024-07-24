import { render, screen } from '@testing-library/react';
import DropdownMenu from './DropdownMenu';
import userEvent from '@testing-library/user-event';

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

      expect(option).not.toBeInTheDocument();
    });

    it('Opens and closes when clicked by the label', async () => {
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

      await userEvent.click(label);
      expect(option).not.toBeInTheDocument();
    });

    it('Closes when clicked outside', async () => {
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

      const button = await screen.findByText(/Off-topic/i);
      await userEvent.click(button);

      expect(option).not.toBeInTheDocument();
    });
  });
});
