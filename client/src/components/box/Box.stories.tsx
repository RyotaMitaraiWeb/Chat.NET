import type { Meta, StoryObj } from '@storybook/react';
import Box from './Box';
import { MdCancel } from 'react-icons/md';

const meta: Meta<typeof Box> = {
  title: 'Example/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <h1>Box</h1>,
  },
};

export const CustomSelector: Story = {
  args: {
    children: <span>Box (selector is h2)</span>,
    selector: 'h2',
  }
}

export const WithPaddingForBetterVisibility: Story = {
  args: {
    children: <p>Hello</p>,
    style: { padding: 24 }
  },
  name: 'With Padding (for better visibility)'
}
