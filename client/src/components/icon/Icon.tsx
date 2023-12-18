import { IconProps } from './types';
import './Icon.scss';

function Icon(props: IconProps): React.JSX.Element {
  const { className = '', size = 'medium', children, ...others } = props;
  return (
    <span className={`component-icon size-${size} ${className}`} {...others}>
      {children}
    </span>
  );
}

export default Icon;
