import { BaseRadioProps } from './types';
import './BaseRadio.scss';

function BaseRadio(props: BaseRadioProps): React.JSX.Element {
  const { className = '', defaultChecked, checked, ...others } = props;
  const checkedClassName = props.checked ? 'checked' : '';
  const classNames = `component-base-radio ${checkedClassName} ${className}`;
  if (defaultChecked !== undefined) {
    return (
      <input className={classNames} defaultChecked={defaultChecked} type="radio" {...others} />
    );
  }

  return <input className={classNames} checked={checked} type="radio" {...others} />;
}

export default BaseRadio;
