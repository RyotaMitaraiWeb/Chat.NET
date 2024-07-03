import type { Meta, StoryObj } from '@storybook/react';
import Chip from './Chip';
import { MdAdd, MdRestoreFromTrash } from 'react-icons/md';

const meta: Meta<typeof Chip> = {
  title: 'Example/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Hello',
  },
};

export const WithStartIcon: Story = {
  args: {
    children: 'Hello',
    startIcon: <MdRestoreFromTrash />,
  },
};

export const Deletable: Story = {
  args: {
    children: 'Hello',
    onDelete() {},
  },
};

export const DeletableWithCustomDeleteIcon: Story = {
  args: {
    children: 'Hello',
    onDelete() {},
    deleteIcon: <MdRestoreFromTrash />,
  },
};

export const DeletableWithStartIcon: Story = {
  args: {
    children: 'Hello',
    startIcon: <MdRestoreFromTrash />,
    onDelete() {},
  },
};

export const Clickable: Story = {
  args: {
    children: 'Clickable',
    clickable: true,
  },
};

export const ClickableAndDeletable: Story = {
  args: {
    children: 'Clickable and deletable',
    clickable: true,
    onDelete() {},
  },
};

export const ClickableWithStartIcon: Story = {
  args: {
    children: 'Clickable',
    clickable: true,
    startIcon: <MdAdd />,
  },
};

export const Variants: Story = {
  render() {
    return (
      <>
        <div>
          <h2>Fill (default)</h2>
          <Chip variant="fill" color="primary">
            Primary
          </Chip>
          <Chip variant="fill" color="secondary">
            Secondary
          </Chip>
          <Chip variant="fill" color="success">
            Success
          </Chip>
          <Chip variant="fill" color="info">
            Info
          </Chip>
          <Chip variant="fill" color="warning">
            Warning
          </Chip>
          <Chip variant="fill" color="error">
            Error
          </Chip>
          <Chip variant="fill">Colorless</Chip>
          <Chip clickable variant="fill" disabled>
            Disabled
          </Chip>
        </div>
        <div>
          <h2>Outlined</h2>
          <Chip variant="outlined" color="primary">
            Primary
          </Chip>
          <Chip variant="outlined" color="secondary">
            Secondary
          </Chip>
          <Chip variant="outlined" color="success">
            Success
          </Chip>
          <Chip variant="outlined" color="info">
            Info
          </Chip>
          <Chip variant="outlined" color="warning">
            Warning
          </Chip>
          <Chip variant="outlined" color="error">
            Error
          </Chip>
          <Chip variant="outlined">Colorless</Chip>
          <Chip clickable variant="fill" disabled>
            Disabled
          </Chip>
        </div>
      </>
    );
  },
};

export const ClickableWithVariantsAndColors: Story = {
  render() {
    return (
      <>
        <div>
          <h2>Fill (default)</h2>
          <Chip clickable variant="fill" color="primary">
            Primary
          </Chip>
          <Chip clickable variant="fill" color="secondary">
            Secondary
          </Chip>
          <Chip clickable variant="fill" color="success">
            Success
          </Chip>
          <Chip clickable variant="fill" color="info">
            Info
          </Chip>
          <Chip clickable variant="fill" color="warning">
            Warning
          </Chip>
          <Chip clickable variant="fill" color="error">
            Error
          </Chip>
          <Chip clickable variant="fill">
            Colorless
          </Chip>
          <Chip clickable variant="fill" disabled>
            Disabled
          </Chip>
        </div>
        <div>
          <h2>Outlined</h2>
          <Chip clickable variant="outlined" color="primary">
            Primary
          </Chip>
          <Chip clickable variant="outlined" color="secondary">
            Secondary
          </Chip>
          <Chip clickable variant="outlined" color="success">
            Success
          </Chip>
          <Chip clickable variant="outlined" color="info">
            Info
          </Chip>
          <Chip clickable variant="outlined" color="warning">
            Warning
          </Chip>
          <Chip clickable variant="outlined" color="error">
            Error
          </Chip>
          <Chip clickable variant="outlined">
            Colorless
          </Chip>
          <Chip clickable variant="fill" disabled>
            Disabled
          </Chip>
        </div>
        <div>
          <h2>Fill, deletable</h2>
          <Chip onDelete={() => {}} clickable variant="fill" color="primary">
            Primary
          </Chip>
          <Chip onDelete={() => {}} clickable variant="fill" color="secondary">
            Secondary
          </Chip>
          <Chip onDelete={() => {}} clickable variant="fill" color="success">
            Success
          </Chip>
          <Chip onDelete={() => {}} clickable variant="fill" color="info">
            Info
          </Chip>
          <Chip onDelete={() => {}} clickable variant="fill" color="warning">
            Warning
          </Chip>
          <Chip onDelete={() => {}} clickable variant="fill" color="error">
            Error
          </Chip>
          <Chip onDelete={() => {}} clickable variant="fill">
            Colorless
          </Chip>
          <Chip onDelete={() => {}} clickable variant="fill" disabled>
            Disabled
          </Chip>
        </div>
        <div>
          <h2>Outlined, deletable</h2>
          <Chip clickable onDelete={() => {}} variant="outlined" color="primary">
            Primary
          </Chip>
          <Chip clickable onDelete={() => {}} variant="outlined" color="secondary">
            Secondary
          </Chip>
          <Chip clickable onDelete={() => {}} variant="outlined" color="success">
            Success
          </Chip>
          <Chip clickable onDelete={() => {}} variant="outlined" color="info">
            Info
          </Chip>
          <Chip clickable onDelete={() => {}} variant="outlined" color="warning">
            Warning
          </Chip>
          <Chip clickable onDelete={() => {}} variant="outlined" color="error">
            Error
          </Chip>
          <Chip clickable onDelete={() => {}} variant="outlined">
            Colorless
          </Chip>
          <Chip clickable onDelete={() => {}} variant="fill" disabled>
            Disabled
          </Chip>
        </div>
      </>
    );
  },
};

export const Sizes: Story = {
  render() {
    return (
      <>
        <div>
          <h3>Normal chips</h3>
          <Chip size="small">Small</Chip>
          <Chip size="medium">Medium</Chip>
          <Chip size="large">Large</Chip>
        </div>
        <div>
          <h3>Clickable chips</h3>
          <Chip clickable size="small">
            Small
          </Chip>
          <Chip clickable size="medium">
            Medium
          </Chip>
          <Chip clickable size="large">
            Large
          </Chip>
        </div>
        <div>
          <h3>Deletable chips</h3>
          <Chip onDelete={() => {}} size="small">
            Small
          </Chip>
          <Chip onDelete={() => {}} size="medium">
            Medium
          </Chip>
          <Chip onDelete={() => {}} size="large">
            Large
          </Chip>
        </div>
        <div>
          <h3>Deletable and clickable chips</h3>
          <Chip clickable onDelete={() => {}} size="small">
            Small
          </Chip>
          <Chip clickable onDelete={() => {}} size="medium">
            Medium
          </Chip>
          <Chip clickable onDelete={() => {}} size="large">
            Large
          </Chip>
        </div>
        <div>
          <h3>Deletable and clickable chips with start icons</h3>
          <Chip startIcon={<MdAdd />} clickable onDelete={() => {}} size="small">
            Small
          </Chip>
          <Chip startIcon={<MdAdd />} clickable onDelete={() => {}} size="medium">
            Medium
          </Chip>
          <Chip startIcon={<MdAdd />} clickable onDelete={() => {}} size="large">
            Large
          </Chip>
        </div>
      </>
    );
  },
};

export const Multiline: Story = {
  render() {
    return (
      <div style={{ width: 300 }}>
        <div>
          <Chip multiline>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit dicta commodi cumque
            fugiat, facere distinctio eos quisquam rem aperiam iusto illum, cum animi accusamus
            voluptatibus cupiditate? Suscipit iusto nisi cumque.
          </Chip>
        </div>
        <div>
          <Chip clickable multiline>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit dicta commodi cumque
            fugiat, facere distinctio eos quisquam rem aperiam iusto illum, cum animi accusamus
            voluptatibus cupiditate? Suscipit iusto nisi cumque.
          </Chip>
        </div>
        <div>
          <Chip clickable onDelete={() => {}} multiline>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit dicta commodi cumque
            fugiat, facere distinctio eos quisquam rem aperiam iusto illum, cum animi accusamus
            voluptatibus cupiditate? Suscipit iusto nisi cumque.
          </Chip>
        </div>
        <div>
          <Chip href="/test" clickable onDelete={() => {}} multiline>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit dicta commodi cumque
            fugiat, facere distinctio eos quisquam rem aperiam iusto illum, cum animi accusamus
            voluptatibus cupiditate? Suscipit iusto nisi cumque.
          </Chip>
        </div>
      </div>
    );
  },
};
