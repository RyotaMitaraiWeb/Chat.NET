'use client';
import { Chat } from '@/types/chat';
import { useState } from 'react';
import AddFavorite from './buttons/AddFavorite';
import RemoveFavorite from './buttons/RemoveFavorite';
import { addFavorite } from '@/actions/chat/addFavorite';
import { removeFavorite } from '@/actions/chat/removeFavorite';
import Button from '@/components/button/Button';
import { MdOutlineArrowDownward } from 'react-icons/md';

type FavoriteButtonProps = {
  room: Chat;
};

function FavoriteButton(props: FavoriteButtonProps): React.JSX.Element {
  const [favorite, setFavorite] = useState(props.room.isFavorite);
  const [loading, setLoading] = useState(false);

  function markAsFavorite() {
    setLoading(true);
    addFavorite(props.room.id).then(() => {
      setFavorite(true);
      setLoading(false);
    });
  }

  function removeAsFavorite() {
    setLoading(true);
    removeFavorite(props.room.id).then(() => {
      setFavorite(false);
      setLoading(false);
    });
  }

  if (loading) {
    return (
      <Button disabled icon={<MdOutlineArrowDownward />}>
        Processing request...
      </Button>
    );
  }

  if (!favorite) {
    return <AddFavorite onAddFavorite={markAsFavorite} />;
  }

  return <RemoveFavorite onRemoveFavorite={removeAsFavorite} />;
}

export default FavoriteButton;
