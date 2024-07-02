import { ChipProps } from './types';
import './Chip.scss';
import { _generateClassName } from './_generateClassName';
import BaseButtonWithIcon from '../internal/baseButton/BaseButtonWithIcon';

function Chip(props: ChipProps): React.JSX.Element {
  const {
    onClick,
    onDelete,
    deleteIcon,
    startIcon,
    multiline,
    variant = 'fill',
    color,
    children,
    size,
    disabled,
    href,
    target,
    className = '',
    clickable,
    ...others
  } = props;

  const chipClassNames = _generateClassName({
    multiline,
    variant,
    color,
    size,
    disabled,
    clickable,
  });

  return (
    <div className={`component-chip ${chipClassNames} ${className}`} {...others}>
      <BaseButtonWithIcon onClick={onClick} target={target} href={href}>
        {children}
      </BaseButtonWithIcon>
    </div>
  );
}

export default Chip;
