import { BaseCheckboxProps } from './types';
import './BaseCheckbox.scss';

/**
 * This component can be used to implement checkbox-like components.
 * The base checkbox hides the native control entirely, allowing
 * you to replace it with a custom one. This component
 * supports both uncontrolled and controlled checkboxes.
 */
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
