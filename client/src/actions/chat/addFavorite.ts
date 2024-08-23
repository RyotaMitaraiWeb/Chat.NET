import { api } from '@/constants/api';

export async function addFavorite(id: number) {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', `Bearer ${localStorage.getItem('access_token') || ''}`);

  const res = await fetch(api.chat.favorite.change(id), {
    method: 'PUT',
    headers,
  });

  if (!res.ok) {
    throw new Error();
  }

  return undefined;
}
