import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';
import { MdCancel } from 'react-icons/md';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Example/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Colors: Story = {
  render: () => (
    <>
      <p>Variants: primary, secondary, info, error, warning, success</p>
      <Checkbox color="primary"></Checkbox>
      <Checkbox color="secondary"></Checkbox>
      <Checkbox color="info"></Checkbox>
      <Checkbox color="error"></Checkbox>
      <Checkbox color="warning"></Checkbox>
      <Checkbox color="success"></Checkbox>
    </>
  ),
};

export const Disabled: Story = {
  render: () => (
    <>
      <Checkbox disabled color="primary"></Checkbox>
      <Checkbox disabled checked color="primary"></Checkbox>
      <Checkbox disabled checked color="secondary"></Checkbox>
      <Checkbox disabled checked color="info"></Checkbox>
      <Checkbox disabled checked color="error"></Checkbox>
      <Checkbox disabled checked color="warning"></Checkbox>
      <Checkbox disabled checked color="success"></Checkbox>
    </>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <p>Row is checked: {open.toString()}</p>
        <Checkbox checked={open} onChange={() => setOpen((o) => !o)}></Checkbox>
        <Checkbox checked={open} onChange={() => setOpen((o) => !o)}></Checkbox>
      </>
    );
  },
};

export const DefaultCheckedUncontrolled: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Labels: Story = {
  render: () => (
    <>
      <p>Aligned as flex column with some gap</p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Checkbox style={{ marginBottom: 8 }} side="right">
          Right
        </Checkbox>
        <Checkbox style={{ marginBottom: 8 }} side="bottom">
          Bottom
        </Checkbox>
        <Checkbox style={{ marginBottom: 8 }} side="left">
          Left
        </Checkbox>
        <Checkbox side="top">Top</Checkbox>
      </div>
    </>
  ),
};

export const Sizes: Story = {
  render: () => (
  <>
    <Checkbox size="small" />
    <Checkbox size="medium" />
    <Checkbox size="large" />
  </>),
}

export const SizesWithLabels: Story = {
  render: () => (
    <>
      <p>Aligned as flex column with some gap</p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 24 }}>
        <Checkbox size="small" style={{ marginBottom: 8 }} side="right">
          Right
        </Checkbox>
        <Checkbox size="small" style={{ marginBottom: 8 }} side="bottom">
          Bottom
        </Checkbox>
        <Checkbox size="small" style={{ marginBottom: 8 }} side="left">
          Left
        </Checkbox>
        <Checkbox size="small" side="top">Top</Checkbox>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 32 }}>
        <Checkbox size="medium" style={{ marginBottom: 8 }} side="right">
          Right
        </Checkbox>
        <Checkbox size="medium" style={{ marginBottom: 8 }} side="bottom">
          Bottom
        </Checkbox>
        <Checkbox size="medium" style={{ marginBottom: 8 }} side="left">
          Left
        </Checkbox>
        <Checkbox size="medium" side="top">Top</Checkbox>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Checkbox size="large" style={{ marginBottom: 8 }} side="right">
          Right
        </Checkbox>
        <Checkbox size="large" style={{ marginBottom: 8 }} side="bottom">
          Bottom
        </Checkbox>
        <Checkbox size="large" style={{ marginBottom: 8 }} side="left">
          Left
        </Checkbox>
        <Checkbox size="large" side="top">Top</Checkbox>
      </div>
    </>
  ),
};

export const CustomIcon = {
  args: {
    icon: <MdCancel />
  }
}