import { api } from '@/constants/api';
import { Chat } from '@/types/chat';

export async function getChatRoomData(id: number): Promise<Chat> {
  const res = await fetch(api.chat.get(id), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error();
  }

  const data = res.json();

  return data as Promise<Chat>;
}
