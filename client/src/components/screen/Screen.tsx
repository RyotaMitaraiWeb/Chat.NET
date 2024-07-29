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

export function ExtraSmallScreen(props: ViewportScreenProps): React.JSX.Element {
  return <Screen from="extra small" {...props} />;
}

export function SmallScreen(props: ViewportScreenProps): React.JSX.Element {
  return <Screen from="small" {...props} />;
}

export function MediumScreen(props: ViewportScreenProps): React.JSX.Element {
  return <Screen from="medium" {...props} />;
}

export function LargeScreen(props: ViewportScreenProps): React.JSX.Element {
  return <Screen from="large" {...props} />;
}

export function ExtraLargeScreen(props: ViewportScreenProps): React.JSX.Element {
  return <Screen from="extra large" {...props} />;
}
