import Icon from '@/components/icon/Icon';
import BaseButtonWithIcon from '../baseButton/BaseButtonWithIcon';
import { ChipBodyProps } from './types';

function ChipBody(props: ChipBodyProps): React.JSX.Element {
  const {
    children,
    className = '',
    clickable,
    startIcon,
    disabled,
    href,
    target,
    onClick,
    ...others
  } = props;

  if (clickable) {
    return (
      <BaseButtonWithIcon
        className={`component-chip-body ${className}`}
        icon={startIcon}
        disabled={disabled}
        href={href}
        target={target}
        onClick={onClick}
        {...others}
      >
        {startIcon ? <Icon>{startIcon}</Icon> : null}
        {children}
      </BaseButtonWithIcon>
    );
  }

  const classNames = props.startIcon ? 'component-chip-body with-icon' : 'component-chip-body';

  return (
    <div className={classNames} {...others}>
      {startIcon ? <Icon>{startIcon}</Icon> : null}
      {children}
    </div>
  );
}

export default ChipBody;
