'use client';
import { getChatRoomData } from '@/actions/chat/getChatData';
import Loader from '@/components/loader/Loader';
import ChatRoom from '@/features/chat/ChatRoom';
import { Chat } from '@/types/chat';
import { useEffect, useState } from 'react';

type Params = {
  id: number;
};

export default function Page({ params }: { params: Params }) {
  const id = params.id;
  const [room, setRoom] = useState<Chat>();

  useEffect(() => {
    if (id) {
      getChatRoomData(id).then(setRoom);
    }
  }, [id]);

  if (!room) {
    return <Loader size="large" text="Connecting..., please hold on" />;
  }

  return <ChatRoom room={room} />;
}
