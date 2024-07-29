import { HeadingProps } from './types';
import './Heading.scss';

/**
 * A styled heading, supports h1-h6.
 */
function Heading(props: HeadingProps): React.JSX.Element {
  const { level, className = '', ...others } = props;

  const HeadingTag = `h${level}` as keyof HTMLElementTagNameMap;

  return <HeadingTag className={`component-heading ${className}`} {...others} />;
}

export default Heading;
