import type { Meta, StoryObj } from '@storybook/react';
import Radio from './Radio';
import { useState } from 'react';

const meta: Meta<typeof Radio> = {
  title: 'Example/Radio',
  component: Radio,
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
      <Radio name="test" color="primary"></Radio>
      <Radio name="test" color="secondary"></Radio>
      <Radio name="test" color="info"></Radio>
      <Radio name="test" color="error"></Radio>
      <Radio name="test" color="warning"></Radio>
      <Radio name="test" color="success"></Radio>
    </>
  ),
};

export const Disabled: Story = {
  render: () => (
    <>
      <Radio disabled color="primary"></Radio>
      <Radio disabled checked color="primary"></Radio>
      <Radio disabled checked color="secondary"></Radio>
      <Radio disabled checked color="info"></Radio>
      <Radio disabled checked color="error"></Radio>
      <Radio disabled checked color="warning"></Radio>
      <Radio disabled checked color="success"></Radio>
    </>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('Yes');

    return (
      <>
        <p>Current option: {value}</p>
        <Radio value="Yes" checked={value === 'Yes'} onChange={() => setValue('Yes')}></Radio>
        <Radio value="No" checked={value === 'No'} onChange={() => setValue('No')}></Radio>
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
        <Radio name="test" style={{ marginBottom: 8 }} side="right">
          Right
        </Radio>
        <Radio name="test" style={{ marginBottom: 8 }} side="bottom">
          Bottom
        </Radio>
        <Radio name="test" style={{ marginBottom: 8 }} side="left">
          Left
        </Radio>
        <Radio name="test" side="top">
          Top
        </Radio>
      </div>
    </>
  ),
};

export const Sizes: Story = {
  render: () => (
    <>
      <Radio name="test" size="small" />
      <Radio name="test" size="medium" />
      <Radio name="test" size="large" />
    </>
  ),
};

export const SizesWithLabels: Story = {
  render: () => (
    <>
      <p>Aligned as flex column with some gap</p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          marginBottom: 24,
        }}
      >
        <Radio name="test1" size="small" style={{ marginBottom: 8 }} side="right">
          Right
        </Radio>
        <Radio name="test1" size="small" style={{ marginBottom: 8 }} side="bottom">
          Bottom
        </Radio>
        <Radio name="test1" size="small" style={{ marginBottom: 8 }} side="left">
          Left
        </Radio>
        <Radio name="test1" size="small" side="top">
          Top
        </Radio>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          marginBottom: 32,
        }}
      >
        <Radio name="test2" size="medium" style={{ marginBottom: 8 }} side="right">
          Right
        </Radio>
        <Radio name="test2" size="medium" style={{ marginBottom: 8 }} side="bottom">
          Bottom
        </Radio>
        <Radio name="test2" size="medium" style={{ marginBottom: 8 }} side="left">
          Left
        </Radio>
        <Radio name="test2" size="medium" side="top">
          Top
        </Radio>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Radio name="test3" size="large" style={{ marginBottom: 8 }} side="right">
          Right
        </Radio>
        <Radio name="test3" size="large" style={{ marginBottom: 8 }} side="bottom">
          Bottom
        </Radio>
        <Radio name="test3" size="large" style={{ marginBottom: 8 }} side="left">
          Left
        </Radio>
        <Radio name="test3" size="large" side="top">
          Top
        </Radio>
      </div>
    </>
  ),
};
