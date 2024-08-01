import type { Meta, StoryObj } from '@storybook/react';
import Toolbar from './Toolbar';
import Radio from '@/components/radio/Radio';
import { useState } from 'react';

const meta: Meta<typeof Toolbar> = {
  title: 'Example/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render() {
    const [size, setSize] = useState(320);
    const viewports = [
      {
        size: 320,
        label: 'Extra small',
      },
      {
        size: 640,
        label: 'Small',
      },
      {
        size: 1024,
        label: 'Medium',
      },
      {
        size: 1440,
        label: 'Large',
      },
      {
        size: 1920,
        label: 'Extra large',
      },
    ];
    return (
      <>
        <div style={{ marginBottom: 16, width: size }}>
          <Toolbar />
        </div>
        {viewports.map((v) => (
          <Radio
            checked={size === v.size}
            side="bottom"
            style={{ marginLeft: 16 }}
            key={v.size}
            onChange={() => setSize(v.size)}
          >
            {v.label}
          </Radio>
        ))}
        <p>Note: resize window after selecting an option</p>
      </>
    );
  },
};
