import Icon from '../icon/Icon';
import BaseCheckbox from '../internal/baseCheckbox/BaseCheckbox';
import { CheckboxProps } from './types';
import { MdDone } from 'react-icons/md';
import './Checkbox.scss';
import '@/styles/colors.scss';

function Checkbox(props: CheckboxProps): React.JSX.Element {
  const {
    className = '',
    icon = <MdDone />,
    color = 'primary',
    side = 'right',
    label,
    size = 'medium',
    onChange,
    value,
    checked,
    name,
    ...others
  } = props;
  return (
    <label
      className={`component-checkbox ${
        checked ? 'checked' : 'unchecked'
      } ${side} ${size} ${className}`}
      {...others}
    >
      <span className="component-checkbox-label">{label}</span>
      <div className={`checkbox ${size} ${color}`}>
        <Icon size={size} className="component-checkbox-icon">
          {icon}
        </Icon>
        <BaseCheckbox value={value} checked={checked} onChange={onChange} name={name} />
      </div>
    </label>
  );
}

export default Checkbox;
