import { api } from '@/constants/api';
import { Chat } from '@/types/chat';

export async function getChatRoomData(id: number): Promise<Chat> {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', localStorage.getItem('access_token') || '');

  const res = await fetch(api.chat.get(id), {
    method: 'GET',
    headers,
  });

  if (!res.ok) {
    throw new Error();
  }

  const data = await res.json();

  return data;
}
