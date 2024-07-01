import { createElement } from 'react';
import { BoxProps } from './types';
import './Box.scss';

/**
 * A standard wrapper that includes an accent background and a shadow.
 */
function Box(props: BoxProps): React.JSX.Element {
  const { className = '', selector = 'div', ...others } = props;
  const element = createElement(selector as string, {
    className: 'component-box ' + className,
    ...others,
  });

  return element;
}

export default Box;
