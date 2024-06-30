import Icon from '../icon/Icon';
import BaseCheckbox from '../internal/baseCheckbox/BaseCheckbox';
import { CheckboxProps } from './types';
import { MdDone } from 'react-icons/md';
import './Checkbox.scss';
import '@/styles/colors.scss';

/**
 * A styled checkbox whose color, size, positioning, and icon can be
 * configured.
 */
function Checkbox(props: CheckboxProps): React.JSX.Element {
  const {
    className = '',
    icon = <MdDone />,
    color = 'primary',
    side = 'right',
    children,
    size = 'medium',
    onChange,
    value,
    checked,
    name,
    defaultChecked,
    disabled,
    ...others
  } = props;

  return (
    <label
      className={`component-checkbox ${generateCheckedClassName(checked)} ${side} size-${size} ${
        disabled ? 'disabled' : 'enabled'
      } ${className}`}
      {...others}
    >
      <div className="component-checkbox-label">{children}</div>
      <div className={`checkbox size-${size} ${color}`}>
        <Icon size={size} className="component-checkbox-icon">
          {icon}
        </Icon>
        <BaseCheckbox
          defaultChecked={defaultChecked}
          value={value}
          checked={checked}
          onChange={onChange}
          name={name}
          disabled={disabled}
        />
      </div>
    </label>
  );
}

function generateCheckedClassName(checked?: boolean): string {
  if (checked === undefined) {
    return 'default-check';
  }

  return checked ? 'checked' : 'unchecked';
}

export default Checkbox;
