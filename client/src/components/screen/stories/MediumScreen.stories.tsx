import type { Meta, StoryObj } from '@storybook/react';
import { MediumScreen } from '../Screen';

const meta: Meta<typeof MediumScreen> = {
  title: 'Example/Medium screen',
  component: MediumScreen,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This should be visible from 1024px onwards',
  },
};

export const Range: Story = {
  args: {
    children: 'This should be visible between 1024px and 1440px',
    to: 'large',
  },
};

export const Inline: Story = {
  render() {
    return (
      <span>
        The word at the end should be visible from 1024px onwards:{' '}
        <MediumScreen inline>JavaScript</MediumScreen>
      </span>
    );
  },
};
