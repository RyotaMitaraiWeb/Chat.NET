import { TooltipProps } from './types';
import './Tooltip.scss';

/**
 * The tooltip is a black / gray (depending on the user's theme) block
 * containing some content. The block is visible only when the component's children
 * are hovered or focused.
 *
 * Currently, the tooltip will always be displayed above the children.
 */
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
