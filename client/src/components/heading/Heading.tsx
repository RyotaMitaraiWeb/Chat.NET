import { createElement } from 'react';
import { HeadingProps } from './types';
import './Heading.scss';

/**
 * A styled heading, supports h1-h6.
 */
function Heading(props: HeadingProps): React.JSX.Element {
  const { level, className = '', ...others } = props;
  const heading = createElement(`h${level}`, {
    className: 'component-heading ' + className,
    ...others,
  });

  return heading;
}

export default Heading;
