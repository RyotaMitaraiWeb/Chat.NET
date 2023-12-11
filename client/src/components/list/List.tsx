import { ListProps } from './types';
import './List.scss';

/**
 * A menu-like list. Unless using client-side features for
 * button list items, this component can be used as a server one.
 */
function List(props: ListProps): React.JSX.Element {
  const { children, size = 'medium', outlined, className = '', ...others } = props;
  const outlinedClass = outlined ? 'outlined' : '';
  return (
    <ul {...others} className={`component-list size-${size} ${outlinedClass} ${className}`}>
      {children}
    </ul>
  );
}

export default List;
