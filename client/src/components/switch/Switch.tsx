import Icon from '../icon/Icon';
import { SwitchProps } from './types';
import { MdCircle } from 'react-icons/md';
import './Switch.scss';
import BaseCheckbox from '../internal/baseCheckbox/BaseCheckbox';

/**
 * The switch component is a special kind of checkbox, typically used
 * for binary choices (e.g. choosing the app's theme).
 * The switch's bar color (when checked) and icons can be customized to
 * fit different scenarios. The switch can be controlled or uncontrolled.
 */
function Switch(props: SwitchProps) {
  const {
    side = 'left',
    children,
    color,
    defaultChecked,
    checked,
    disabled,
    onChange,
    name,
    value,
    iconOn = <MdCircle />,
    iconOff = <MdCircle />,
    ...others
  } = props;

  const backgroundClass = color ? 'background-' + color : '';
  const disabledClass = disabled ? 'disabled' : 'enabled';

  return (
    <label className={`component-switch ${side} ${disabledClass}`} {...others}>
      <div className="component-radio-label">{children}</div>
      <div className={`switch ${backgroundClass}`}>
        <Icon size="large" className="switch-icon">
          <span aria-hidden={true} className="off">
            {iconOff}
          </span>
          <span aria-hidden={true} className="on">
            {iconOn}
          </span>
        </Icon>
        <div className="switch-bar">
          <BaseCheckbox
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            checked={checked}
            defaultChecked={defaultChecked}
            className="checkbox"
          />
        </div>
      </div>
    </label>
  );
}

export default Switch;
