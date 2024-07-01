import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from './Button';
import { MdCancel } from 'react-icons/md';

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
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
    children: 'Hello',
  },
};

export const Sizes: Story = {
  render: () => (
    <>
      <p>Variants: primary, secondary, info, error, success, warning, no color, disabled</p>
      <div>
        <h6>Small</h6>
        <Button size="small" color="primary">
          Hello
        </Button>
        <Button size="small" color="secondary">
          Hello
        </Button>
        <Button size="small" color="info">
          Hello
        </Button>
        <Button size="small" color="error">
          Hello
        </Button>
        <Button size="small" color="success">
          Hello
        </Button>
        <Button size="small" color="warning">
          Hello
        </Button>
        <Button size="small">Hello</Button>
        <Button size="small" disabled>
          Hello
        </Button>
      </div>
      <div>
        <h4>Medium</h4>
        <Button size="medium" color="primary">
          Hello
        </Button>
        <Button size="medium" color="secondary">
          Hello
        </Button>
        <Button size="medium" color="info">
          Hello
        </Button>
        <Button size="medium" color="error">
          Hello
        </Button>
        <Button size="medium" color="success">
          Hello
        </Button>
        <Button size="medium" color="warning">
          Hello
        </Button>
        <Button size="medium">Hello</Button>
        <Button size="medium" disabled>
          Hello
        </Button>
      </div>
      <div>
        <h2>Large</h2>
        <Button size="large" color="primary">
          Hello
        </Button>
        <Button size="large" color="secondary">
          Hello
        </Button>
        <Button size="large" color="info">
          Hello
        </Button>
        <Button size="large" color="error">
          Hello
        </Button>
        <Button size="large" color="success">
          Hello
        </Button>
        <Button size="large" color="warning">
          Hello
        </Button>
        <Button size="large">Hello</Button>
        <Button onClick={fn} size="large" disabled>
          Hello
        </Button>
      </div>
    </>
  ),
};

export const Variants: Story = {
  render: () => (
    <>
      <div>
        <h3>Text</h3>
        <Button variant="text" color="primary">
          Hello
        </Button>
        <Button variant="text" color="secondary">
          Hello
        </Button>
        <Button variant="text" color="success">
          Hello
        </Button>
        <Button variant="text" color="warning">
          Hello
        </Button>
        <Button variant="text" color="info">
          Hello
        </Button>
        <Button variant="text" color="error">
          Hello
        </Button>
        <Button variant="text">Hello</Button>
        <Button variant="text" disabled>
          Hello
        </Button>
      </div>
      <div>
        <h3>Fill (default)</h3>
        <Button variant="fill" color="primary">
          Hello
        </Button>
        <Button variant="fill" color="secondary">
          Hello
        </Button>
        <Button variant="fill" color="success">
          Hello
        </Button>
        <Button variant="fill" color="warning">
          Hello
        </Button>
        <Button variant="fill" color="info">
          Hello
        </Button>
        <Button variant="fill" color="error">
          Hello
        </Button>
        <Button variant="fill">Hello</Button>
        <Button variant="fill" disabled>
          Hello
        </Button>
      </div>
      <div>
        <h3>Outlined</h3>
        <Button variant="outlined" color="primary">
          Hello
        </Button>
        <Button variant="outlined" color="secondary">
          Hello
        </Button>
        <Button variant="outlined" color="success">
          Hello
        </Button>
        <Button variant="outlined" color="warning">
          Hello
        </Button>
        <Button variant="outlined" color="info">
          Hello
        </Button>
        <Button variant="outlined" color="error">
          Hello
        </Button>
        <Button variant="outlined">Hello</Button>
        <Button variant="outlined" disabled>
          Hello
        </Button>
      </div>
    </>
  ),
};

export const LinkButton: Story = {
  render: () => (
    <>
      <div>
        <Button href="https://storybook.js.org/" color="primary">
          External link (no target)
        </Button>
        <Button href="https://storybook.js.org/" target="_blank" color="secondary">
          External link (target _blank)
        </Button>
        <Button href="/test" color="info">
          Internal link (Next route)
        </Button>
        <Button onClick={fn} href="https://storybook.js.org/" disabled>
          Disabled (rendered as button)
        </Button>
      </div>
    </>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <>
      <div style={{ marginBottom: '2em' }}>
        <Button color="primary" icon={<MdCancel />} size="small">
          Small
        </Button>
        <Button color="success" icon={<MdCancel />}>
          Medium
        </Button>
        <Button color="error" icon={<MdCancel />} size="large">
          Large
        </Button>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button icon={<MdCancel />} href="/test">
          Link
        </Button>
        <Button onClick={fn} icon={<MdCancel />} disabled>
          Disabled
        </Button>
      </div>
    </>
  ),
};
