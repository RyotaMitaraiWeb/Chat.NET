import { BaseCheckboxProps } from './types';
import './BaseCheckbox.scss';

function BaseCheckbox(props: BaseCheckboxProps): React.JSX.Element {
  const { className = '', checked, ...others } = props;
  const checkedClassName = props.checked ? 'checked' : '';
  const classNames = `component-base-checkbox ${checkedClassName} ${className}`;

  return <input className={classNames} checked={checked} type="checkbox" {...others} />;
}

export default BaseCheckbox;
