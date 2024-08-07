import type { Meta, StoryObj } from '@storybook/react';
import Switch from './Switch';
import { MdModeNight, MdSunny } from 'react-icons/md';
import { useState } from 'react';

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

export const WithLabel: Story = {
  render() {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Switch side="left">Left</Switch>
          <Switch side="top">Top</Switch>
          <Switch side="bottom">Bottom</Switch>
          <Switch side="right">Right</Switch>
        </div>
      </>
    );
  },
};

export const Controlled: Story = {
  render() {
    const [checked, setChecked] = useState(false);

    function handleChange() {
      setChecked((c) => !c);
    }
    return (
      <>
        <p>Switches are checked: {checked.toString()}</p>
        <Switch checked={checked} onChange={handleChange} />
        <Switch checked={checked} onChange={handleChange} />
      </>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledWithColor: Story = {
  args: {
    disabled: true,
    color: 'success',
    checked: true,
  },
};
