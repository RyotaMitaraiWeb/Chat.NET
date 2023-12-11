import '../ListItem.scss';
import { ListItemButtonProps } from './types';
import BaseButton from '@/components/internal/baseButton/BaseButton';

/**
 * A button to be used as a child of a ``<List>`` component.
 * Can be turned into a hyperlink.
 */
function ListItemButton(props: ListItemButtonProps): React.JSX.Element {
  const { className = '', children, href, target, onClick, disabled, ...others } = props;

  return (
    <li className={`component-list-item-button ${className}`} {...others}>
      <BaseButton
        className="button"
        disabled={disabled}
        onClick={onClick}
        href={href}
        target={target}
      >
        {children}
      </BaseButton>
    </li>
  );
}

export default ListItemButton;
