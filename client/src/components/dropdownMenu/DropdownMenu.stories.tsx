import type { Meta, StoryObj } from '@storybook/react';
import DropdownMenu from './DropdownMenu';
import { useState } from 'react';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Example/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render() {
    const values = [
      'Europe',
      'Africa',
      'Asia',
      'North America',
      'South America',
      'Oceania',
      'Antarctica',
    ];

    const [value, setValue] = useState(values[0]);
    return (
      <DropdownMenu
        values={values}
        renderOption={(value, index) => (
          <strong>
            {index + 1}. {value}
          </strong>
        )}
        value={value}
        onChange={setValue}
        labelId="eu-member-state-label"
      />
    );
  },
};

export const WithALotOfItems: Story = {
  render() {
    const values = [
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

    const [value, setValue] = useState(values[0]);
    return (
      <DropdownMenu
        values={values}
        renderOption={(value: string) => <span>{value}</span>}
        value={value}
        onChange={setValue}
        label="Select an EU member state"
        labelId="eu-member-state-label"
      />
    );
  },
};

export const Disabled: Story = {
  render() {
    const values = [
      'Europe',
      'Africa',
      'Asia',
      'North America',
      'South America',
      'Oceania',
      'Antarctica',
    ];

    const [value, setValue] = useState(values[3]);
    return (
      <DropdownMenu
        values={values}
        renderOption={(value, index) => (
          <strong>
            {index + 1}. {value}
          </strong>
        )}
        value={value}
        onChange={setValue}
        labelId="eu-member-state-label"
        disabled
      />
    );
  },
};

export const VeryLongOptions: Story = {
  render() {
    const values = [
      'Europe',
      'Africa',
      'Asia',
      'North America',
      'South America',
      'Oceania',
      'Antarctica',
      'The super almighty continent, ruled by the Holy Britannian Empire',
      'The super almighty continent, ruled by the Holy Britannian Empire'.replaceAll(' ', ''),
    ];

    const [value, setValue] = useState(values[0]);
    return (
      <DropdownMenu
        values={values}
        renderOption={(value, index) => (
          <strong>
            {index + 1}. {value}
          </strong>
        )}
        value={value}
        onChange={setValue}
        labelId="eu-member-state-label"
      />
    );
  },
};

export const AutoWidth: Story = {
  render() {
    const values = [
      'Europe',
      'Africa',
      'Asia',
      'North America',
      'South America',
      'Oceania',
      'Antarctica',
      'The super almighty continent, ruled by the Holy Britannian Empire',
      'The super almighty continent, ruled by the Holy Britannian Empire'.replaceAll(' ', ''),
    ];

    const [value, setValue] = useState(values[0]);
    return (
      <DropdownMenu
        values={values}
        renderOption={(value, index) => (
          <strong>
            {index + 1}. {value}
          </strong>
        )}
        value={value}
        onChange={setValue}
        labelId="eu-member-state-label"
        autoWidth
      />
    );
  },
};
