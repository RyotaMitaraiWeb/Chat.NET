import type { Meta, StoryObj } from '@storybook/react';
import Alert from './Alert';
import { MdCancel } from 'react-icons/md';

const meta: Meta<typeof Alert> = {
  title: 'Example/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

const longText =
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, molestias ex necessitatibus repellat perferendis quo consectetur, sapiente in aspernatur accusantium magni odio voluptas cum. Molestias repudiandae ipsa eum possimus provident.';
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: longText,
    alertTitle: 'Alert title',
  },
};

export const WithAction: Story = {
  args: {
    children: longText,
    alertTitle: 'Alert title',
    alertActions: <button>Action</button>,
  },
};

export const Severities: Story = {
  render: () => (
    <>
      <Alert severity="success" alertTitle="Success" alertActions={<button>Action</button>}>
        {longText}
      </Alert>
      <Alert severity="warning" alertTitle="Warning" alertActions={<button>Action</button>}>
        {longText}
      </Alert>
      <Alert severity="info" alertTitle="Info" alertActions={<button>Action</button>}>
        {longText}
      </Alert>
      <Alert severity="error" alertTitle="Error" alertActions={<button>Action</button>}>
        {longText}
      </Alert>
    </>
  ),
};

export const CustomIcon: Story = {
  args: {
    children: longText,
    alertTitle: 'Alert title',
    alertActions: <button>Action</button>,
    icon: <MdCancel />,
  },
};
