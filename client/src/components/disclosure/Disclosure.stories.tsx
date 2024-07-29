import type { Meta, StoryObj } from '@storybook/react';
import Disclosure from './Disclosure';
import { useState } from 'react';

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
    label: 'Toggle text',
    children: `Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Laboriosam impedit laudantium, 
      hic aperiam molestiae totam quasi. Quo, obcaecati laboriosam, 
      veniam beatae est atque porro a libero quisquam, tempora neque non?`,
  },
};

export const WithOpenAndCloseLabels: Story = {
  args: {
    closedLabel: 'Show text',
    openLabel: 'Hide text',
    children: 'Hello, nice to meet you',
  },
};

export const Padded: Story = {
  args: {
    label: 'Toggle text',
    children: `Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Laboriosam impedit laudantium, 
      hic aperiam molestiae totam quasi. Quo, obcaecati laboriosam, 
      veniam beatae est atque porro a libero quisquam, tempora neque non?`,
    padded: true,
  },
};

export const DefaultOpenAndEventListeners: Story = {
  render() {
    const [text1, setText1] = useState('closed');
    const [text2, setText2] = useState('this should be opened by default');
    return (
      <>
        <Disclosure
          label={`State: ${text1}`}
          onOpen={() => setText1('opened')}
          onClose={() => setText1('closed')}
        >
          Hello1
        </Disclosure>
        <Disclosure
          label={text2}
          onOpen={() => setText2('this should be opened by default')}
          onClose={() => setText2('closed text')}
          open
        >
          Hello2
        </Disclosure>
      </>
    );
  },
};
