import Button from '@/components/button/Button';
import { MdFavoriteBorder } from 'react-icons/md';

type AddFavoriteProps = {
  onAddFavorite: () => void;
};

function AddFavorite(props: AddFavoriteProps): React.JSX.Element {
  return (
    <Button
      icon={<MdFavoriteBorder />}
      onClick={props.onAddFavorite}
      variant="text"
      color="secondary"
    >
      Add as favorite
    </Button>
  );
}

export default AddFavorite;
