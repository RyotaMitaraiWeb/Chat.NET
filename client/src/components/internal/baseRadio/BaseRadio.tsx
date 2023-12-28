import { BaseRadioProps } from './types';
import './BaseRadio.scss';

/**
 * This component can be used to implement radio-like components.
 * The base radio hides the native radio button entirely, allowing
 * you to replace it with a custom button. This component
 * supports both uncontrolled and controlled radio buttons.
 */
function BaseRadio(props: BaseRadioProps): React.JSX.Element {
  const { className = '', defaultChecked, checked, ...others } = props;
  const checkedClassName = props.checked ? 'checked' : '';
  const classNames = `component-base-radio ${checkedClassName} ${className}`;
  if (checked === undefined) {
    return (
      <input className={classNames} defaultChecked={defaultChecked} type="radio" {...others} />
    );
  }

  return <input className={classNames} checked={checked} type="radio" {...others} />;
}

export default BaseRadio;
