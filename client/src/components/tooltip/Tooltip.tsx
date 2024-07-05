import { TooltipProps } from './types';
import './Tooltip.scss';

function Tooltip(props: TooltipProps): React.JSX.Element {
  const { children, content, ...others } = props;
  return (
    <span role="tooltip" className="component-tooltip-container" {...others}>
      <span className="component-tooltip-children">{children}</span>
      <div className="component-tooltip">{content}</div>
    </span>
  );
}

export default Tooltip;
