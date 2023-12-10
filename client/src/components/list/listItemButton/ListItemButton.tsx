import Link from 'next/link';
import '../ListItem.scss';
import { ListItemButtonLinkProps, ListItemButtonProps } from './types';

/**
 * A button to be used as a child of a ``<List>`` component.
 * Can be turned into a hyperlink.
 */
function ListItemButton(props: ListItemButtonProps): React.JSX.Element {
  const { className = '', children, href, target, onClick, ...others } = props;

  return (
    <li className={`component-list-item-button ${className}`} {...others}>
      <ButtonLink onClick={onClick} href={href} target={target}>
        {children}
      </ButtonLink>
    </li>
  );
}

function ButtonLink(props: ListItemButtonLinkProps) {
  if (!props.href) {
    return (
      <button onClick={props.onClick} className="button">
        {props.children}
      </button>
    );
  }

  return (
    <Link href={props.href} onClick={props.onClick} target={props.target} className="button">
      {props.children}
    </Link>
  );
}

export default ListItemButton;
