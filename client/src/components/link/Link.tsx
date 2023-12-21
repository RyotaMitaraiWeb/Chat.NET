import { default as NextLink } from 'next/link';
import { LinkProps } from './types';
import '@/styles/colors.scss';
import './Link.scss';

/**
 * A styled hyperlink, implementing Next's own link.
 */
function Link(props: LinkProps): React.JSX.Element {
  const { className = '', color, children, ...others } = props;
  const classNames = `component-link ${color ? `text-${color}` : 'text-default'} ${className}`;
  return (
    <NextLink className={classNames} {...others}>
      {children}
    </NextLink>
  );
}

export default Link;
