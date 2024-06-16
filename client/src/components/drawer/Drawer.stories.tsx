import type { Meta, StoryObj } from '@storybook/react';
import Drawer from './Drawer';
import { useState } from 'react';

const meta: Meta<typeof Drawer> = {
  title: 'Example/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button onClick={() => setOpen(true)}>Open menu</button>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <p>
            To close this drawer, press the &quot;Close&quot; button or the Escape key or click the
            overlay. You can also press &quot;Enter&quot;, as the dialog focuses the first focusable
            element (in this case, the close button). Use the example to explore the focus trap as
            well.
          </p>
          <button onClick={() => setOpen(false)}>Close</button>
          <button onClick={() => setOpen(false)}>Agree</button>
          <button>Does not close</button>
        </Drawer>
      </>
    );
  },
};

export const Sides: Story = {
  render: () => {
    const [openLeft, setOpenLeft] = useState(false);
    const [openTop, setOpenTop] = useState(false);
    const [openRight, setOpenRight] = useState(false);
    const [openBottom, setOpenBottom] = useState(false);

    return (
      <>
        <button onClick={() => setOpenLeft(true)}>Left</button>
        <button onClick={() => setOpenTop(true)}>Top</button>
        <button onClick={() => setOpenRight(true)}>Right</button>
        <button onClick={() => setOpenBottom(true)}>Bottom</button>

        <Drawer side="left" open={openLeft} onClose={() => setOpenLeft(false)}>
          Left
          <button onClick={() => setOpenLeft(false)}>Close</button>
        </Drawer>
        <Drawer side="top" open={openTop} onClose={() => setOpenTop(false)}>
          Top
          <button onClick={() => setOpenTop(false)}>Close</button>
        </Drawer>
        <Drawer side="right" open={openRight} onClose={() => setOpenRight(false)}>
          Right
          <button onClick={() => setOpenRight(false)}>Close</button>
        </Drawer>
        <Drawer side="bottom" open={openBottom} onClose={() => setOpenBottom(false)}>
          Bottom
          <button onClick={() => setOpenBottom(false)}>Close</button>
        </Drawer>
      </>
    );
  },
};
