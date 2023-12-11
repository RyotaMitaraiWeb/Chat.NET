import Link from 'next/link';
import { BaseButtonProps } from '../types/BaseButton';
import './BaseButton.scss';

function BaseButton(props: BaseButtonProps): React.JSX.Element {
  const { className = '', disabled, children, href, target, ...others } = props;
  const classNames = `component-base-button ${className}`;
  if (href) {
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
