import BaseRadio from '../internal/baseRadio/BaseRadio';
import { RadioProps } from './types';
import './Radio.scss';

/**
 * A styled radio button whose color, positioning, and size can be configured.
 */
function Radio(props: RadioProps): React.JSX.Element {
  const {
    className = '',
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
      className={`component-radio ${disabled ? 'disabled' : 'enabled'} ${
        checked ? 'checked' : 'unchecked'
      } ${side} size-${size} ${className}`}
      {...others}
    >
      <div className="component-radio-label">{children}</div>
      <div className={`radio size-${size}`}>
        <span className={`radio-button background-${color}`}>
          <BaseRadio
            defaultChecked={defaultChecked}
            value={value}
            checked={checked}
            onChange={onChange}
            name={name}
            disabled={disabled}
          />
        </span>
      </div>
    </label>
  );
}

export default Radio;
