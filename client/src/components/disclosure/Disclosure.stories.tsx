import type { Meta, StoryObj } from '@storybook/react';
import Disclosure from './Disclosure';

const meta: Meta<typeof Disclosure> = {
  title: 'Example/Disclosure',
  component: Disclosure,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Show text',
    children: `Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Laboriosam impedit laudantium, 
      hic aperiam molestiae totam quasi. Quo, obcaecati laboriosam, 
      veniam beatae est atque porro a libero quisquam, tempora neque non?`,
  },
};
