import { act, render, screen } from '@testing-library/react';
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
      const option = await screen.findByText('Bulgaria');
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
      const option = await screen.findByText('Bulgaria');

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

      const option = await screen.findByText('Bulgaria');

      const button = await screen.findByText(/Off-topic/i);
      await userEvent.click(button);

      expect(option).not.toBeInTheDocument();
    });

    it('Opens and closes with space key', async () => {
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
      act(() => menu.focus());
      expect(menu).toHaveFocus();
      await userEvent.keyboard(' ');
      const option = await screen.findByText('Bulgaria');

      await userEvent.keyboard(' ');
      expect(option).not.toBeInTheDocument();
    });

    it('Opens and closes with enter key', async () => {
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
      act(() => menu.focus());
      expect(menu).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      const option = await screen.findByText('Bulgaria');

      await userEvent.keyboard('{Enter}');
      expect(option).not.toBeInTheDocument();
    });

    it('Opens with Home key and correctly sets the temporary select value', async () => {
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
      act(() => menu.focus());
      expect(menu).toHaveFocus();
      await userEvent.keyboard('{Home}');
      const option = await screen.findByText('Bulgaria');
      await userEvent.click(option);

      act(() => menu.focus());

      await userEvent.keyboard('{Home}');
      const selectedItem = document.querySelector('.focused');
      expect(selectedItem?.textContent?.includes('Austria')).toBe(true);
    });

    it('Opens with End key and correctly sets the temporary select value', async () => {
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
      act(() => menu.focus());
      expect(menu).toHaveFocus();
      await userEvent.keyboard('{End}');
      const selectedItem = document.querySelector('.focused');
      expect(selectedItem?.textContent?.includes('Sweden')).toBe(true);
    });

    it('Opens with Arrow up key and correctly sets the temporary select value', async () => {
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
      act(() => menu.focus());
      expect(menu).toHaveFocus();
      await userEvent.keyboard('{ArrowUp}');
      const option = await screen.findByText('Bulgaria');
      await userEvent.click(option);

      act(() => menu.focus());

      await userEvent.keyboard('{ArrowUp}');
      const selectedItem = document.querySelector('.focused');
      expect(selectedItem?.textContent?.includes('Austria')).toBe(true);
    });

    it('Closes with tab key and correctly sets the selected value', async () => {
      const fn = jest.fn();
      render(
        <DropdownMenu
          renderOption={(value: string) => <span>{value}</span>}
          values={memberStates}
          onChange={fn}
          labelId="eu-member-states"
          value="Bulgaria"
        />,
      );

      const menu = await screen.findByRole('combobox');
      await userEvent.click(menu);

      const option = await screen.findByText('Austria');

      await userEvent.tab();

      expect(fn).toHaveBeenCalledWith('Bulgaria');
      expect(option).not.toBeInTheDocument();
    });

    it('Opens with arrow down key correctly', async () => {
      const fn = jest.fn();
      render(
        <DropdownMenu
          renderOption={(value: string) => <span>{value}</span>}
          values={memberStates}
          onChange={fn}
          labelId="eu-member-states"
          value="Bulgaria"
        />,
      );

      const menu = await screen.findByRole('combobox');
      act(() => menu.focus());

      await userEvent.keyboard('{ArrowDown}');

      const selectedOption = document.querySelector('.focused');
      expect(selectedOption?.textContent?.includes('Bulgaria')).toBe(true);
    });

    it('Opens with printable characters correctly', async () => {
      const fn = jest.fn();
      render(
        <DropdownMenu
          renderOption={(value: string) => <span>{value}</span>}
          values={memberStates}
          onChange={fn}
          labelId="eu-member-states"
          value="Bulgaria"
        />,
      );

      const menu = await screen.findByRole('combobox');
      act(() => menu.focus());

      await userEvent.keyboard('mal');

      const selectedOption = document.querySelector('.focused');
      expect(selectedOption?.textContent?.includes('Malta')).toBe(true);
    });

    it('Closes with tab key and correctly sets the selected value', async () => {
      const fn = jest.fn();
      render(
        <DropdownMenu
          renderOption={(value: string) => <span>{value}</span>}
          values={memberStates}
          onChange={fn}
          labelId="eu-member-states"
          value="Bulgaria"
        />,
      );

      const menu = await screen.findByRole('combobox');
      await userEvent.click(menu);
      const option = await screen.findByText('Austria');

      await userEvent.keyboard('{Escape}');

      expect(option).not.toBeInTheDocument();
    });
  });

  describe('Selecting an option', () => {
    it('Correctly navigates with up and down arrows', async () => {
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

      await userEvent.keyboard('{ArrowDown>10/}');
      await userEvent.keyboard('{ArrowUp>2/}');
      const option = document.querySelector('.focused')!;
      await userEvent.click(option);

      expect(fn).toHaveBeenCalledWith('Finland');
    });

    it('Up arrow does not change the value if the first option is selected', async () => {
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

      await userEvent.keyboard('{ArrowUp>30/}');
      const option = document.querySelector('.focused')!;
      await userEvent.click(option);

      expect(fn).toHaveBeenCalledWith('Austria');
    });

    it('Down arrow does not change the value if the last option is selected', async () => {
      const fn = jest.fn();
      render(
        <DropdownMenu
          renderOption={(value: string) => <span>{value}</span>}
          values={memberStates}
          onChange={fn}
          labelId="eu-member-states"
          value="Sweden"
        />,
      );

      const menu = await screen.findByRole('combobox');
      await userEvent.click(menu);

      await userEvent.keyboard('{ArrowDown>30/}');
      const option = document.querySelector('.focused')!;
      await userEvent.click(option);

      expect(fn).toHaveBeenCalledWith('Sweden');
    });
  });
});
