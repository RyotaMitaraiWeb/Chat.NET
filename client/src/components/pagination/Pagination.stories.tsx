import type { Meta, StoryObj } from '@storybook/react';
import Pagination from './Pagination';
import { useState } from 'react';
import Link from 'next/link';

const meta: Meta<typeof Pagination> = {
  title: 'Example/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 10,
  },
};

export const WithNextAndPrev: Story = {
  args: {
    count: 10,
    showNext: true,
    showPrev: true,
  },
};

export const Disabled: Story = {
  args: {
    count: 10,
    disabled: true,
    showNext: true,
    showPrev: true,
  },
};

export const Controlled: Story = {
  render() {
    const [page, setPage] = useState(4);

    return (
      <>
        <p>The current page is {page}</p>
        <Pagination count={10} page={page} onChangePage={setPage} showNext showPrev />
      </>
    );
  },
};

export const CustomPageElement: Story = {
  args: {
    count: 10,
    renderItem: (page) => <Link href={`/${page}`}>#{page}</Link>,
  },
};
