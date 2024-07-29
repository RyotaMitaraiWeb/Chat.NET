import type { Meta, StoryObj } from '@storybook/react';
import { LargeScreen } from '../Screen';

const meta: Meta<typeof LargeScreen> = {
  title: 'Example/Large screen',
  component: LargeScreen,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This should be visible from 1440px onwards',
  },
};

export const Range: Story = {
  args: {
    children: 'This should be visible between 1440px and 1920px',
    to: 'extra large',
  },
};

export const Inline: Story = {
  render() {
    return (
      <span>
        The word at the end should be visible from 1440px onwards:{' '}
        <LargeScreen inline>JavaScript</LargeScreen>
      </span>
    );
  },
};
