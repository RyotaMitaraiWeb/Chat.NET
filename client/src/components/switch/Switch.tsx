import Icon from '../icon/Icon';
import { SwitchProps } from './types';
import { MdCircle } from 'react-icons/md';
import './Switch.scss';
import BaseCheckbox from '../internal/baseCheckbox/BaseCheckbox';

function Switch(props: SwitchProps) {
  const {
    side,
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
  return (
    <label className={`component-switch ${side}`} {...others}>
      <div className="component-radio-label">{children}</div>
      <div className="switch">
        <Icon size="large" className="switch-icon">
          <span className="off">{iconOff}</span>
          <span className="on">{iconOn}</span>
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
