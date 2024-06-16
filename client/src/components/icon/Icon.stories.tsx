import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';
import { MdCancel } from 'react-icons/md';

const meta: Meta<typeof Icon> = {
  title: 'Example/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <MdCancel />,
  },
};

export const Sizes: Story = {
  render: () => (
    <>
      <Icon title="Small" size="small">
        <MdCancel />
      </Icon>
      <Icon title="Medium" size="medium">
        <MdCancel />
      </Icon>
      <Icon title="Large" size="large">
        <MdCancel />
      </Icon>
    </>
  ),
};
