import type { Meta, StoryObj } from '@storybook/react';
import Dialog from './Dialog';
import { MdCancel } from 'react-icons/md';
import { useState } from 'react';
import DialogTitle from './dialogTitle/DialogTitle';
import DialogContent from './dialogContent/DialogContent';
import DialogFooter from './dialogFooter/DialogFooter';

const meta: Meta<typeof Dialog> = {
  title: 'Example/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const longText =
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos animi neque dolore doloremque molestias dolorum beatae, aut nobis earum perferendis officia accusamus inventore omnis velit non corporis laudantium voluptates dignissimos.';

/**
 * A focusable element within the dialog is required to render this without issues.
 * The dialog can be closed with the Escape key, clicking in the overlay, or
 * by clicking a button designated for closing the dialog.
 */
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button onClick={() => setOpen(true)}>Open menu</button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <p>
            To close this dialog, press the "Close" button or the Escape key or click the overlay.
            You can also press "Enter", as the dialog focuses the first focusable element (in this
            case, the close button).
          </p>
          <button onClick={() => setOpen(false)}>Close</button>
        </Dialog>
      </>
    );
  },
};

export const WithTitleContentAndFooter: Story = {
  name: 'With Title, Content, and Footer',
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button onClick={() => setOpen(true)}>Open menu</button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Example dialog</DialogTitle>
          <DialogContent>
            <p>
              Use this example to explore the focus trap and how the dialog handles big chunks of
              content
            </p>
            <p>{longText}</p>
            <p>{longText}</p>
            <p>{longText}</p>
            <p>{longText}</p>
            <p>{longText}</p>
            <p>{longText}</p>
            <p>{longText}</p>
          </DialogContent>
          <DialogFooter>
            <button onClick={() => setOpen(false)}>Reject</button>
            <button onClick={() => setOpen(false)}>Accept</button>
            <button>Button that does not close</button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};
