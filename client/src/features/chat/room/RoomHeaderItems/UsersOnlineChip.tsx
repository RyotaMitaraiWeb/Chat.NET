'use client';

import Chip from '@/components/chip/Chip';
import { useState } from 'react';
import { MdPeople } from 'react-icons/md';
import UsersOnlineList from './UsersOnlineList';
import { ChatUser } from '@/types/chat';

type UsersOnlineChipProps = {
  users: ChatUser[];
};

export default function UsersOnlineChip(props: UsersOnlineChipProps) {
  const [open, setOpen] = useState(false);

  function openUsersList() {
    setOpen(true);
  }

  return (
    <>
      <Chip
        color="secondary"
        className="users-online-chip"
        size="medium"
        variant="fill"
        clickable
        startIcon={<MdPeople />}
        onClick={openUsersList}
      >
        {props.users.length} {props.users.length === 1 ? 'user' : 'users'} online
      </Chip>
      <UsersOnlineList open={open} onClose={() => setOpen(false)} users={props.users} />
    </>
  );
}
