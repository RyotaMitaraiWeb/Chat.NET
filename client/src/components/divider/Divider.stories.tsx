import type { Meta, StoryObj } from '@storybook/react';
import Divider from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Example/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render() {
    return (
      <div>
        <p>Text 1</p>
        <Divider />
        <p>Text 2</p>
      </div>
    );
  },
};

export const Vertical = {
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <p>Text 1</p>
        <Divider variant="vertical" />
        <p>Text 2</p>
      </div>
    );
  },
};
