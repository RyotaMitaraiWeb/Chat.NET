import '../ListItem.scss';
import { ListItemButtonProps } from './types';
import BaseButton from '@/components/internal/baseButton/BaseButton';

/**
 * A button to be used as a child of a ``<List>`` component.
 * Can be turned into a hyperlink.
 */
function ListItemButton(props: ListItemButtonProps): React.JSX.Element {
  const {
    className = '',
    inset,
    children,
    href,
    target,
    onClick,
    disabled,
    icon,
    ...others
  } = props;

  return (
    <li
      className={`component-list-item-button ${icon || inset ? 'with-icon' : ''} ${className}`}
      {...others}
    >
      <BaseButton
        className="button"
        disabled={disabled}
        onClick={onClick}
        href={href}
        target={target}
        icon={icon}
      >
        <div className={`component-list-item-icon ${inset ? 'inset' : ''}`}>{icon}</div>
        <div className="content">{children}</div>
      </BaseButton>
    </li>
  );
}

export default ListItemButton;
