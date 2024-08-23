import Button from '@/components/button/Button';
import { MdFavorite } from 'react-icons/md';

type RemoveFavoriteProps = {
  onRemoveFavorite: () => void;
};

function RemoveFavorite(props: RemoveFavoriteProps): React.JSX.Element {
  return (
    <Button icon={<MdFavorite />} onClick={props.onRemoveFavorite} variant="text" color="warning">
      Remove from favorites
    </Button>
  );
}

export default RemoveFavorite;
