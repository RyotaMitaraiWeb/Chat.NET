import { ScreenProps, ViewportScreenProps } from './types';
import './Screen.scss';

function Screen(props: ScreenProps): React.JSX.Element {
  const { from, to, children, inline } = props;
  const className =
    `screen-${from.replace(/ /g, '-')}` +
    `${to && to !== from ? '-to-' + to.replace(/ /g, '-') : ''}`;
  return inline ? (
    <span className={className}>{children}</span>
  ) : (
    <div className={className}>{children}</div>
  );
}

/**
 * Displays the passed content if the viewport is at least 0px.
 *
 * The upper viewport boundary can be specified with the ``to`` prop.
 * For example, specifying ``to`` as ``large`` will make this
 * visible up until 1440px (not inclusive)
 *
 * In practical terms, this will always be displayed and should only
 * be used when combined with the ``to`` prop.
 */
export function ExtraSmallScreen(props: ViewportScreenProps): React.JSX.Element {
  return <Screen from="extra small" {...props} />;
}

/**
 * Displays the passed content if the viewport is at least 640px.
 *
 * The upper viewport boundary can be specified with the ``to`` prop.
 * For example, specifying ``to`` as ``large`` will make this
 * visible up until 1440px (not inclusive)
 *
 */
export function SmallScreen(props: ViewportScreenProps): React.JSX.Element {
  return <Screen from="small" {...props} />;
}

/**
 * Displays the passed content if the viewport is at least 1024px.
 *
 * The upper viewport boundary can be specified with the ``to`` prop.
 * For example, specifying ``to`` as ``large`` will make this
 * visible up until 1440px (not inclusive)
 *
 */
export function MediumScreen(props: ViewportScreenProps): React.JSX.Element {
  return <Screen from="medium" {...props} />;
}

/**
 * Displays the passed content if the viewport is at least 1440px.
 *
 * The upper viewport boundary can be specified with the ``to`` prop.
 * For example, specifying ``to`` as ``extra large`` will make this
 * visible up until 1920px (not inclusive)
 *
 */
export function LargeScreen(props: ViewportScreenProps): React.JSX.Element {
  return <Screen from="large" {...props} />;
}

/**
 * Displays the passed content if the viewport is at least 1920px.
 */
export function ExtraLargeScreen(
  props: Pick<ViewportScreenProps, Exclude<keyof ViewportScreenProps, 'to'>>,
): React.JSX.Element {
  return <Screen from="extra large" {...props} />;
}
