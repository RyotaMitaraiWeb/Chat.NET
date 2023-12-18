import { BaseButtonWithIconProps } from '@/components/types/BaseButton';
import BaseButton from './BaseButton';

/**
 * A base button that supports icons as a supplement to its content.
 * If an icon is not passed, this component is the equivalent of
 * ``BaseButton``. Passing an icon gives this component a ``with-icon`` class,
 * though the icon component itself is not included; this is so that the
 * components using this can better position the icon per their needs.
 */
function BaseButtonWithIcon(props: BaseButtonWithIconProps): React.JSX.Element {
  const { icon, className = '', children, ...others } = props;
  const classNames = icon ? `with-icon ${className}` : className;
  return (
    <BaseButton className={classNames} {...others}>
      {children}
    </BaseButton>
  );
}

export default BaseButtonWithIcon;
