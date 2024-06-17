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
            <ListItemButton href="/test">Small list item button link</ListItemButton>
          </List>
          <List size="medium">
            <ListItem>Medium list item #1</ListItem>
            <ListItem>Medium list item #2</ListItem>
            <ListItem>Medium list item #3</ListItem>
            <ListItemButton>Medium list item button</ListItemButton>
            <ListItemButton href="/test">Medium list item button link</ListItemButton>
          </List>
          <List size="large">
            <ListItem>Large list item #1</ListItem>
            <ListItem>Large list item #2</ListItem>
            <ListItem>Large list item #3</ListItem>
            <ListItemButton>Large list item button</ListItemButton>
            <ListItemButton href="/test">Large list item button link</ListItemButton>
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

export const SizesWithIcons: Story = {
  render() {
    return (
      <>
        <p>Lists aligned as flex column for gaps</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <List size="small">
            <ListItem icon={<MdCreate />}>List item icon</ListItem>
            <ListItem inset>Inset list item icon</ListItem>
            <ListItemButton icon={<MdCreate />}>List item button icon</ListItemButton>
            <ListItemButton inset>Inset list item button icon</ListItemButton>
            <ListItemButton href="/test" icon={<MdCreate />}>
              List item button link icon
            </ListItemButton>
            <ListItemButton href="/test" inset>
              Inset list item button link icon
            </ListItemButton>
          </List>
          <List size="medium">
            <ListItem icon={<MdCreate />}>List item icon</ListItem>
            <ListItem inset>Inset list item icon</ListItem>
            <ListItemButton icon={<MdCreate />}>List item button icon</ListItemButton>
            <ListItemButton inset>Inset list item button icon</ListItemButton>
            <ListItemButton href="/test" icon={<MdCreate />}>
              List item button link icon
            </ListItemButton>
            <ListItemButton href="/test" inset>
              Inset list item button link icon
            </ListItemButton>
          </List>
          <List size="large">
            <ListItem icon={<MdCreate />}>List item icon</ListItem>
            <ListItem inset>Inset list item icon</ListItem>
            <ListItemButton icon={<MdCreate />}>List item button icon</ListItemButton>
            <ListItemButton inset>Inset list item button icon</ListItemButton>
            <ListItemButton href="/test" icon={<MdCreate />}>
              List item button link icon
            </ListItemButton>
            <ListItemButton href="/test" inset>
              Inset list item button link icon
            </ListItemButton>
          </List>
        </div>
      </>
    );
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

export const LongContent: Story = {
  render() {
    return (
      <>
        <p>Lists aligned as flex column for gaps, each has a width of 300px</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 300 }}>
          <List size="small">
            <ListItem>
              List item - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat sit
              laboriosam ullam, repellendus iure culpa nesciunt quod aliquam atque. Quod ipsum vitae
              odio excepturi libero a, quisquam fugiat aut id!
            </ListItem>
            <ListItemButton>
              List item button - Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              labore iusto fugit, tenetur adipisci dolorem eum repudiandae tempore modi repellendus
              necessitatibus quae. Consectetur, iusto reprehenderit? Velit tempora quam dicta ab?
            </ListItemButton>
            <ListItemButton href="/test">
              List item button link - Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Tempore minima placeat optio eveniet ullam officiis harum quam porro sit expedita?
              Debitis, nihil porro! Suscipit ex quis esse optio vitae repellat.
            </ListItemButton>
          </List>
          <List size="medium">
            <ListItem>
              List item - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat sit
              laboriosam ullam, repellendus iure culpa nesciunt quod aliquam atque. Quod ipsum vitae
              odio excepturi libero a, quisquam fugiat aut id!
            </ListItem>
            <ListItemButton>
              List item button - Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              labore iusto fugit, tenetur adipisci dolorem eum repudiandae tempore modi repellendus
              necessitatibus quae. Consectetur, iusto reprehenderit? Velit tempora quam dicta ab?
            </ListItemButton>
            <ListItemButton href="/test">
              List item button link - Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Tempore minima placeat optio eveniet ullam officiis harum quam porro sit expedita?
              Debitis, nihil porro! Suscipit ex quis esse optio vitae repellat.
            </ListItemButton>
          </List>
          <List size="large">
            <ListItem>
              List item - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat sit
              laboriosam ullam, repellendus iure culpa nesciunt quod aliquam atque. Quod ipsum vitae
              odio excepturi libero a, quisquam fugiat aut id!
            </ListItem>
            <ListItemButton>
              List item button - Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              labore iusto fugit, tenetur adipisci dolorem eum repudiandae tempore modi repellendus
              necessitatibus quae. Consectetur, iusto reprehenderit? Velit tempora quam dicta ab?
            </ListItemButton>
            <ListItemButton href="/test">
              List item button link - Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Tempore minima placeat optio eveniet ullam officiis harum quam porro sit expedita?
              Debitis, nihil porro! Suscipit ex quis esse optio vitae repellat.
            </ListItemButton>
          </List>
        </div>
      </>
    );
  },
};

export const LongContentWithIcons: Story = {
  render() {
    return (
      <>
        <p>Lists aligned as flex column for gaps, each has a width of 300px</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 300 }}>
          <List size="small">
            <ListItem icon={<MdCreate />}>
              List item - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat sit
              laboriosam ullam, repellendus iure culpa nesciunt quod aliquam atque. Quod ipsum vitae
              odio excepturi libero a, quisquam fugiat aut id!
            </ListItem>
            <ListItem inset>
              Inset list item - Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem
              expedita consectetur tenetur culpa voluptas quas, magnam, dolorum, provident veniam
              quaerat pariatur soluta et explicabo sunt odit alias sequi dicta ea?
            </ListItem>
            <ListItemButton icon={<MdCreate />}>
              List item button - Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              labore iusto fugit, tenetur adipisci dolorem eum repudiandae tempore modi repellendus
              necessitatibus quae. Consectetur, iusto reprehenderit? Velit tempora quam dicta ab?
            </ListItemButton>
            <ListItemButton inset>
              Inset list item button icon - Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Porro atque eligendi facilis explicabo alias aliquid iste, odio maxime, perferendis
              dolor, velit nihil voluptatum hic dolorum in numquam error. Quam, voluptate!
            </ListItemButton>
            <ListItemButton href="/test" icon={<MdCreate />}>
              List item button link - Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Tempore minima placeat optio eveniet ullam officiis harum quam porro sit expedita?
              Debitis, nihil porro! Suscipit ex quis esse optio vitae repellat.
            </ListItemButton>
            <ListItemButton href="/test" inset>
              Inset list item button link - Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus dicta rerum iure asperiores quod magni minus cumque ea odio. Ex similique
              error velit esse laboriosam dolorem quam corporis nihil delectus.
            </ListItemButton>
          </List>
          <List size="medium">
            <ListItem icon={<MdCreate />}>
              List item - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat sit
              laboriosam ullam, repellendus iure culpa nesciunt quod aliquam atque. Quod ipsum vitae
              odio excepturi libero a, quisquam fugiat aut id!
            </ListItem>
            <ListItem inset>
              Inset list item - Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem
              expedita consectetur tenetur culpa voluptas quas, magnam, dolorum, provident veniam
              quaerat pariatur soluta et explicabo sunt odit alias sequi dicta ea?
            </ListItem>
            <ListItemButton icon={<MdCreate />}>
              List item button - Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              labore iusto fugit, tenetur adipisci dolorem eum repudiandae tempore modi repellendus
              necessitatibus quae. Consectetur, iusto reprehenderit? Velit tempora quam dicta ab?
            </ListItemButton>
            <ListItemButton inset>
              Inset list item button icon - Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Porro atque eligendi facilis explicabo alias aliquid iste, odio maxime, perferendis
              dolor, velit nihil voluptatum hic dolorum in numquam error. Quam, voluptate!
            </ListItemButton>
            <ListItemButton href="/test" icon={<MdCreate />}>
              List item button link - Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Tempore minima placeat optio eveniet ullam officiis harum quam porro sit expedita?
              Debitis, nihil porro! Suscipit ex quis esse optio vitae repellat.
            </ListItemButton>
            <ListItemButton href="/test" inset>
              Inset list item button link - Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus dicta rerum iure asperiores quod magni minus cumque ea odio. Ex similique
              error velit esse laboriosam dolorem quam corporis nihil delectus.
            </ListItemButton>
          </List>
          <List size="large">
            <ListItem icon={<MdCreate />}>
              List item - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat sit
              laboriosam ullam, repellendus iure culpa nesciunt quod aliquam atque. Quod ipsum vitae
              odio excepturi libero a, quisquam fugiat aut id!
            </ListItem>
            <ListItem inset>
              Inset list item - Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem
              expedita consectetur tenetur culpa voluptas quas, magnam, dolorum, provident veniam
              quaerat pariatur soluta et explicabo sunt odit alias sequi dicta ea?
            </ListItem>
            <ListItemButton icon={<MdCreate />}>
              List item button - Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              labore iusto fugit, tenetur adipisci dolorem eum repudiandae tempore modi repellendus
              necessitatibus quae. Consectetur, iusto reprehenderit? Velit tempora quam dicta ab?
            </ListItemButton>
            <ListItemButton inset>
              Inset list item button icon - Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Porro atque eligendi facilis explicabo alias aliquid iste, odio maxime, perferendis
              dolor, velit nihil voluptatum hic dolorum in numquam error. Quam, voluptate!
            </ListItemButton>
            <ListItemButton href="/test" icon={<MdCreate />}>
              List item button link - Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Tempore minima placeat optio eveniet ullam officiis harum quam porro sit expedita?
              Debitis, nihil porro! Suscipit ex quis esse optio vitae repellat.
            </ListItemButton>
            <ListItemButton href="/test" inset>
              Inset list item button link - Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus dicta rerum iure asperiores quod magni minus cumque ea odio. Ex similique
              error velit esse laboriosam dolorem quam corporis nihil delectus.
            </ListItemButton>
          </List>
        </div>
      </>
    );
  },
};
