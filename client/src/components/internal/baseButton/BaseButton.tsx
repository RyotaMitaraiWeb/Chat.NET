import Link from 'next/link';
import { BaseButtonProps } from '../../types/BaseButton';
import './BaseButton.scss';

/**
 * Renders a button with minimal functionality and styling. The button
 * becomes a ``<Link>`` if a valid ``href`` is passed and it is not disabled.
 */
function BaseButton(props: BaseButtonProps): React.JSX.Element {
  const { className = '', disabled, children, href, target, icon, ...others } = props;
  const classNames = `component-base-button ${icon ? 'with-icon' : ''} ${
    disabled ? 'disabled' : ''
  } ${className}`;
  if (href && !disabled) {
    return (
      <Link href={href} target={target} className={classNames}>
        {children}
      </Link>
    );
  }
  return (
    <button disabled={disabled} className={classNames} {...others}>
      {children}
    </button>
  );
}

export default BaseButton;
