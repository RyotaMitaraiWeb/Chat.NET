import type { Meta, StoryObj } from '@storybook/react';
import TextField from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Example/ServerTextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HelpertText: Story = {
  args: {
    helperText: 'Your username does not have to match your real name',
  },
};

export const NumberField: Story = {
  args: {
    type: 'number',
  },
};

export const Label: Story = {
  args: {
    label: 'Username',
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'John Doe',
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
    value: 'John Doe',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'John Doe',
  },
};

export const Sizes: Story = {
  render() {
    return (
      <>
        <TextField
          label="Username"
          helperText="Your username does not have to match your real name"
          size="small"
          value="John Doe"
        />
        <TextField
          label="Username"
          helperText="Your username does not have to match your real name"
          size="medium"
          value="John Doe"
        />
        <TextField
          label="Username"
          helperText="Your username does not have to match your real name"
          size="large"
          value="John Doe"
        />
      </>
    );
  },
};
