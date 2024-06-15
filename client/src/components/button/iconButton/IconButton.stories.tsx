import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import IconButton from './IconButton';
import { MdCancel } from 'react-icons/md';

const meta: Meta<typeof IconButton> = {
  title: 'Example/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio' },
    size: { control: 'radio' },
  },
  args: { onClick: fn() },
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
      <>
        <p>Variants: primary, secondary, info, error, transparent, disabled</p>
        <div>
          <h6>Small</h6>
          <IconButton onClick={fn} size="small" color="primary">
            <MdCancel />
          </IconButton>
          <IconButton onClick={fn} size="small" color="secondary">
            <MdCancel />
          </IconButton>
          <IconButton onClick={fn} size="small" color="info">
            <MdCancel />
          </IconButton>
          <IconButton onClick={fn} size="small" color="error">
            <MdCancel />
          </IconButton>
          <IconButton onClick={fn} size="small" color="transparent">
            <MdCancel />
          </IconButton>
          <IconButton size="small" disabled>
            <MdCancel />
          </IconButton>
        </div>
        <div>
          <h4>Medium</h4>
          <IconButton onClick={fn} size="medium" color="primary">
            <MdCancel />
          </IconButton>
          <IconButton onClick={fn} size="medium" color="secondary">
            <MdCancel />
          </IconButton>
          <IconButton onClick={fn} size="medium" color="info">
            <MdCancel />
          </IconButton>
          <IconButton onClick={fn} size="medium" color="error">
            <MdCancel />
          </IconButton>
          <IconButton onClick={fn} size="medium" color="transparent">
            <MdCancel />
          </IconButton>
          <IconButton size="medium" disabled>
            <MdCancel />
          </IconButton>
        </div>
        <div>
          <h2>Large</h2>
          <IconButton size="large" color="primary">
            <MdCancel />
          </IconButton>
          <IconButton size="large" color="secondary">
            <MdCancel />
          </IconButton>
          <IconButton size="large" color="info">
            <MdCancel />
          </IconButton>
          <IconButton size="large" color="error">
            <MdCancel />
          </IconButton>
          <IconButton size="large" color="transparent">
            <MdCancel />
          </IconButton>
          <IconButton onClick={fn} size="large" disabled>
            <MdCancel />
          </IconButton>
        </div>
      </>
    </>
  ),
};

export const LinkIconButton: Story = {
  render: () => (
    <>
      <div>
        <p>Hover over each button for its classification</p>
        <IconButton
          title="External link (no target)"
          href="https://storybook.js.org/"
          color="primary"
        >
          <MdCancel />
        </IconButton>
        <IconButton
          title="External link (target _blank)"
          href="https://storybook.js.org/"
          target="_blank"
          color="secondary"
        >
          <MdCancel />
        </IconButton>
        <IconButton title="Next route" href="/test" color="info">
          <MdCancel />
        </IconButton>
        <IconButton
          title="Disabled link (rendered as button)"
          onClick={fn}
          href="https://storybook.js.org/"
          disabled
        >
          <MdCancel />
        </IconButton>
      </div>
    </>
  ),
};
