import { BaseCheckboxProps } from './types';
import './BaseCheckbox.scss';

function BaseCheckbox(props: BaseCheckboxProps): React.JSX.Element {
  const { className = '', checked, defaultChecked, ...others } = props;
  const classNames = `component-base-checkbox ${className}`;
  if (checked === undefined) {
    return (
      <input
        className={classNames}
        defaultChecked={defaultChecked || false}
        type="checkbox"
        {...others}
      />
    );
  }

  return <input className={classNames} checked={checked} type="checkbox" {...others} />;
}

export default BaseCheckbox;
