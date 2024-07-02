import { ChipProps } from './types';
import './Chip.scss';
import { _generateClassName } from './_generateClassName';
import BaseButtonWithIcon from '../internal/baseButton/BaseButtonWithIcon';
import ChipBody from '../internal/chipBody/ChipBody';

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
    size = 'medium',
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
      <ChipBody
        href={href}
        target={target}
        onClick={onClick}
        clickable={clickable}
        startIcon={startIcon}
        disabled={disabled}
      >
        {children}
      </ChipBody>
    </div>
  );
}

export default Chip;
