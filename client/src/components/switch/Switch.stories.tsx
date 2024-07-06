import type { Meta, StoryObj } from '@storybook/react';
import Switch from './Switch';
import { MdModeNight, MdSunny } from 'react-icons/md';

const meta: Meta<typeof Switch> = {
  title: 'Example/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomSwitchIcons: Story = {
  args: {
    iconOn: <MdModeNight />,
    iconOff: <MdSunny />,
  },
};

export const WithColor: Story = {
  args: {
    color: 'success',
  },
};
