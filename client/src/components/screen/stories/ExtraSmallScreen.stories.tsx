import type { Meta, StoryObj } from '@storybook/react';
import { ExtraSmallScreen } from '../Screen';

const meta: Meta<typeof ExtraSmallScreen> = {
  title: 'Example/Extra small screen',
  component: ExtraSmallScreen,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This should be visible on any viewport',
  },
};

export const Range: Story = {
  args: {
    children: 'This should be visible up to 1024px',
    to: 'medium',
  },
};

export const Inline: Story = {
  render() {
    return (
      <span>
        The word at the end should be visible at any viewport:{' '}
        <ExtraSmallScreen inline>JavaScript</ExtraSmallScreen>
      </span>
    );
  },
};
