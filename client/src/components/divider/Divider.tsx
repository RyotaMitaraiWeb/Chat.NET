import { DividerProps } from './types';
import './Divider.scss';

/**
 * An ``<hr>`` that is styled per the user's prefered theme
 */
function Divider(props: DividerProps): React.JSX.Element {
  const { className = '', ...others } = props;
  return <div className={`component-divider ${className}`} {...others}></div>;
}

export default Divider;
