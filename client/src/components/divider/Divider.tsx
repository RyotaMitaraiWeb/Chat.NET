import { DividerProps } from './types';
import './Divider.scss';

/**
 * A ``div`` that is styled as a divider per the user's prefered theme
 */
function Divider(props: DividerProps): React.JSX.Element {
  const { className = '', variant = 'horizontal', ...others } = props;
  return <div className={`component-divider ${variant} ${className}`} {...others}></div>;
}

export default Divider;
