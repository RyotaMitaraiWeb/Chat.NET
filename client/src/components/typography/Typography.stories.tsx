import type { Meta, StoryObj } from '@storybook/react';
import Typography from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Example/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Hello',
  },
};

export const Sizes: Story = {
  render() {
    return (
      <>
        <Typography size="small">Small</Typography>
        <Typography size="medium">Medium</Typography>
        <Typography size="large">Large</Typography>
      </>
    );
  },
};

export const Colors: Story = {
  render() {
    return (
      <>
        <Typography color="primary">Primary</Typography>
        <Typography color="secondary">Secondary</Typography>
        <Typography color="success">Success</Typography>
        <Typography color="info">Info</Typography>
        <Typography color="warning">Warning</Typography>
        <Typography color="error">Error</Typography>
      </>
    );
  },
};

export const CustomSelector: Story = {
  args: {
    selector: 'strong',
    children: '<strong> selector',
  },
};

export const Emphasis: Story = {
  args: {
    children: 'Hello',
    emphasis: true,
  },
};

export const EmphasisWithColor: Story = {
  args: {
    children: 'Hello',
    emphasis: true,
    color: 'success',
  },
};
