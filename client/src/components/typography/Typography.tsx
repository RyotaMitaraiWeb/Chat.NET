import React, { createElement } from 'react';
import { TypographyProps } from './types';
import './Typography.scss';

/**
 * A component to render text with some configurations, which include:
 * * theming
 * * sizes
 * * whether the text is emphasised or not
 *
 * The component is rendered as a ``<p>`` by default and can be changed using
 * the ``selector`` prop. In addition, a few typographic stylings are applied:
 * * some top and bottom margin
 * * line height of 1.5
 */
function Typography(props: TypographyProps): React.JSX.Element {
  const { color, size = 'medium', selector = 'p', className = '', emphasis, ...others } = props;
  const textColorClass = color ? `text-${color}` : '';
  const emphasisClass = emphasis ? 'emphasis' : 'normal';

  return createElement(selector, {
    className: `component-typography ${emphasisClass} size-${size} ${textColorClass} ${className}`,
    ...others,
  });
}

export default Typography;
