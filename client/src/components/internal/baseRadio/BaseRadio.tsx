import { BaseRadioProps } from './types';
import './BaseRadio.scss';

function BaseRadio(props: BaseRadioProps): React.JSX.Element {
  const { className = '', checked, ...others } = props;
  const checkedClassName = props.checked ? 'checked' : '';
  const classNames = `component-base-radio ${checkedClassName} ${className}`;

  return <input className={classNames} checked={checked} type="radio" {...others} />;
}

export default BaseRadio;
