import type { Meta, StoryObj } from '@storybook/react';
import List from './List';
import ListItem from './listItem/ListItem';
import { MdCancel, MdCreate, MdRemove } from 'react-icons/md';
import ListItemButton from './listItemButton/ListItemButton';

const meta: Meta<typeof List> = {
  title: 'Example/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <ListItem>List item #1</ListItem>
        <ListItem>List item #2</ListItem>
        <ListItem>List item #3</ListItem>
        <ListItemButton>List item button</ListItemButton>
      </>
    ),
  },
};

export const Outlined: Story = {
  args: {
    children: (
      <>
        <ListItem>List item #1</ListItem>
        <ListItem>List item #2</ListItem>
        <ListItem>List item #3</ListItem>
        <ListItemButton>List item button</ListItemButton>
        <ListItem>List item #4</ListItem>
      </>
    ),
    outlined: true,
  },
};

export const BoldedListItems: Story = {
  args: {
    children: (
      <>
        <ListItem>List item #1</ListItem>
        <ListItem bold>List item #2 (bold)</ListItem>
        <ListItem>List item #3</ListItem>
        <ListItemButton bold>List item button (bold)</ListItemButton>
      </>
    ),
  },
};

export const Sizes: Story = {
  render() {
    return (
      <>
        <p>Lists aligned as flex column for gaps</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <List size="small">
            <ListItem>Small list item #1</ListItem>
            <ListItem>Small list item #2</ListItem>
            <ListItem>Small list item #3</ListItem>
            <ListItemButton>Small list item button</ListItemButton>
          </List>
          <List size="medium">
            <ListItem>Medium list item #1</ListItem>
            <ListItem>Medium list item #2</ListItem>
            <ListItem>Medium list item #3</ListItem>
            <ListItemButton>Medium list item button</ListItemButton>
          </List>
          <List size="large">
            <ListItem>Large list item #1</ListItem>
            <ListItem>Large list item #2</ListItem>
            <ListItem>Large list item #3</ListItem>
            <ListItemButton>Large list item button</ListItemButton>
          </List>
        </div>
      </>
    );
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <ListItem icon={<MdCancel />}>List item #1</ListItem>
        <ListItem icon={<MdCreate />}>List item #2</ListItem>
        <ListItemButton icon={<MdRemove />}>List item button</ListItemButton>
        <ListItem inset>Inset (empty space that simulates an icon)</ListItem>
        <ListItemButton inset>Inset list item button</ListItemButton>
      </>
    ),
  },
};

export const ListItemButtons: Story = {
  args: {
    children: (
      <>
        <>
          <ListItem>List item (not a button)</ListItem>
          <ListItemButton>Standard</ListItemButton>
          <ListItemButton href="/test">Internal link</ListItemButton>
          <ListItemButton href="https://storybook.js.org/" target="_blank">
            External link (target _blank)
          </ListItemButton>
        </>
      </>
    ),
  },
};
