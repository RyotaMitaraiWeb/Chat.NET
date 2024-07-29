import type { Meta, StoryObj } from '@storybook/react';
import { ExtraLargeScreen } from '../Screen';

const meta: Meta<typeof ExtraLargeScreen> = {
  title: 'Example/Extra large screen',
  component: ExtraLargeScreen,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This should be visible from 1920px onwards',
  },
};

export const Inline: Story = {
  render() {
    return (
      <span>
        The word at the end should be visible from 1920px onwards:{' '}
        <ExtraLargeScreen inline>JavaScript</ExtraLargeScreen>
      </span>
    );
  },
};
