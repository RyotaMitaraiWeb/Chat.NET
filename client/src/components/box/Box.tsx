import { BoxProps } from './types';
import './Box.scss';

/**
 * A standard wrapper that includes an accent background and a shadow.
 */
function Box(props: BoxProps): React.JSX.Element {
  const { className = '', selector = 'div', ...others } = props;

  const Parent = selector;

  return <Parent className={`component-box ${className}`} {...others} />;
}

export default Box;
