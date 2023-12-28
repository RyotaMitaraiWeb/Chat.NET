import BaseRadio from '../internal/baseRadio/BaseRadio';
import { RadioProps } from './types';
import './Radio.scss';
import '@/styles/colors.scss';
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
    ...others
  } = props;

  return (
    <label
      className={`component-radio ${
        checked ? 'checked' : 'unchecked'
      } ${side} ${size} ${className}`}
      {...others}
    >
      <div className="component-radio-label">{children}</div>
      <div className={`radio ${size}`}>
        <span className={`radio-button ${color}`}>
          <BaseRadio value={value} checked={checked} onChange={onChange} name={name} />
        </span>
      </div>
    </label>
  );
}

export default Radio;
