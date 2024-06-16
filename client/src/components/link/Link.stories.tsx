import type { Meta, StoryObj } from '@storybook/react';
import Link from './Link';

const meta: Meta<typeof Link> = {
  title: 'Example/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '/test',
    children: 'Link',
  },
};

export const Colors: Story = {
  render() {
    return (
      <>
        <Link href="/test" color="default">
          Default
        </Link>
        <Link href="/test" color="primary">
          Primary
        </Link>
        <Link href="/test" color="secondary">
          Secondary
        </Link>
        <Link href="/test" color="success">
          Success
        </Link>
        <Link href="/test" color="info">
          Info
        </Link>
        <Link href="/test" color="warning">
          Warning
        </Link>
        <Link href="/test" color="error">
          Error
        </Link>
      </>
    );
  },
};

export const ExternalLink: Story = {
  args: {
    href: 'https://storybook.js.org/',
    target: '_blank',
    children: 'Storybook.js.org',
  },
};
