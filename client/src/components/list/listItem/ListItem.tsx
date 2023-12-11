import { ListItemProps } from './types';
import '../ListItem.scss';

/**
 * A standard list item to be used as a child of a ``<List>`` component
 */
function ListItem(props: ListItemProps): React.JSX.Element {
  const { className = '', children, ...others } = props;
  return (
    <li className={`component-list-item ${className}`} {...others}>
      {children}
    </li>
  );
}

export default ListItem;
