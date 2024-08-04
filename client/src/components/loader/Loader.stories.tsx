import type { Meta, StoryObj } from '@storybook/react';
import Loader from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Example/Loader',
  component: Loader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithText: Story = {
  args: {
    text: 'Loading...',
  },
};

export const WithTextWithCustomMarkup: Story = {
  args: {
    text: <em>Loading</em>,
  },
};

export const Colors: Story = {
  render() {
    return (
      <>
        <Loader />
        <Loader color="primary" />
        <Loader color="secondary" />
        <Loader color="success" />
        <Loader color="info" />
        <Loader color="warning" />
        <Loader color="error" />
      </>
    );
  },
};

export const ColorsWithText: Story = {
  render() {
    return (
      <>
        <Loader text="Loading" />
        <Loader text="Loading" color="primary" />
        <Loader text="Loading" color="secondary" />
        <Loader text="Loading" color="success" />
        <Loader text="Loading" color="info" />
        <Loader text="Loading" color="warning" />
        <Loader text="Loading" color="error" />
      </>
    );
  },
};
