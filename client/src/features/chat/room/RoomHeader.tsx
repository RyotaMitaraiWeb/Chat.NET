'use client';
import './RoomHeader.scss';
import { Chat, ChatUser } from '@/types/chat';
import ChatRoomInfoButton from './RoomHeaderItems/ChatRoomInfoButton';
import UsersOnlineChip from './RoomHeaderItems/UsersOnlineChip';

type RoomHeaderProps = {
  users: ChatUser[];
  room: Chat;
};

export default function RoomHeader(props: RoomHeaderProps) {
  return (
    <section className="chat-room-header">
      <UsersOnlineChip users={props.users} />
      <ChatRoomInfoButton room={props.room} />
    </section>
  );
}
