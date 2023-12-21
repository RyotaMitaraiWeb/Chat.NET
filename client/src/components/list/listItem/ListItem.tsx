import { ListItemProps } from './types';
import '../ListItem.scss';

/**
 * A standard list item to be used as a child of a ``<List>`` component
 */
function ListItem(props: ListItemProps): React.JSX.Element {
  const { className = '', inset, bold, children, icon, ...others } = props;
  return (
    <li
      className={`component-list-item ${bold ? 'bolded' : ''} ${
        icon || inset ? 'with-icon' : ''
      } ${className}`}
      {...others}
    >
      <div className={`component-list-item-icon ${inset ? 'inset' : ''}`}>{icon}</div>
      <div className="content">{children}</div>
    </li>
  );
}

export default ListItem;
