'use client';
import { Chat } from '@/types/chat';
import { useState } from 'react';
import AddFavorite from './buttons/AddFavorite';
import RemoveFavorite from './buttons/RemoveFavorite';
import { addFavorite } from '@/actions/chat/addFavorite';
import { removeFavorite } from '@/actions/chat/removeFavorite';

type FavoriteButtonProps = {
  room: Chat;
};

function FavoriteButton(props: FavoriteButtonProps): React.JSX.Element {
  const [favorite, setFavorite] = useState(props.room.isFavorite);

  function markAsFavorite() {
    addFavorite(props.room.id).then(() => setFavorite(true));
  }

  function removeAsFavorite() {
    removeFavorite(props.room.id).then(() => setFavorite(false));
  }

  if (!favorite) {
    return <AddFavorite onAddFavorite={markAsFavorite} />;
  }

  return <RemoveFavorite onRemoveFavorite={removeAsFavorite} />;
}

export default FavoriteButton;
