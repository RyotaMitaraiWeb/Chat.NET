import type { Meta, StoryObj } from '@storybook/react';
import { SmallScreen } from '../Screen';

const meta: Meta<typeof SmallScreen> = {
  title: 'Example/Small screen',
  component: SmallScreen,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This should be visible only from 640px and above',
  },
};

export const Range: Story = {
  args: {
    children: 'This should be visible only from 640px to 1024px',
    to: 'medium',
  },
};

export const Inline: Story = {
  render() {
    return (
      <span>
        The word at the end should be visible from 640px and above:{' '}
        <SmallScreen inline>JavaScript</SmallScreen>
      </span>
    );
  },
};
