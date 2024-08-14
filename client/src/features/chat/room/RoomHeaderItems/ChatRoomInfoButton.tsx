'use client';
import IconButton from '@/components/button/iconButton/IconButton';
import { Chat } from '@/types/chat';
import { useState } from 'react';
import { MdMoreVert } from 'react-icons/md';
import ChatRoomInfoDialog from './ChatRoomInfoDialog';

type ChatRoomInfoButtonProps = {
  room: Chat;
};

export default function ChatRoomInfoButton(props: ChatRoomInfoButtonProps) {
  const [open, setOpen] = useState(false);
  function openChatRoomInfo() {
    setOpen(true);
  }

  return (
    <>
      <IconButton
        color="info"
        className="chat-room-info-button"
        variant="fill"
        onClick={openChatRoomInfo}
        aria-label={`View more info about chat room ${props.room.title}`}
      >
        <MdMoreVert />
      </IconButton>
      <ChatRoomInfoDialog open={open} onClose={() => setOpen(false)} room={props.room} />
    </>
  );
}
