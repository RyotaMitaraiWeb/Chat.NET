'use client';
import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import SideNavigation from './SideNavigation';
import ToolbarIcon from '../toolbarIcon/ToolbarIcon';

function MenuButton(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ToolbarIcon onClick={() => setOpen(true)}>
        <MdMenu />
      </ToolbarIcon>
      <SideNavigation open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default MenuButton;
