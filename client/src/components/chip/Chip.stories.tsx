import type { Meta, StoryObj } from '@storybook/react';
import Chip from './Chip';
import { MdRestoreFromTrash } from 'react-icons/md';
import { useState } from 'react';

const meta: Meta<typeof Chip> = {
  title: 'Example/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Hello',
  },
};
