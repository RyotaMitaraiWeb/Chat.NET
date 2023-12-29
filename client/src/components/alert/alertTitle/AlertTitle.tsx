import { AlertTitleProps } from './types';
import './AlertTitle.scss';
function AlertTitle(props: AlertTitleProps): React.JSX.Element {
  const { className = '', children, ...others } = props;
  return (
    <h2 className={`component-alert-title ${className}`} {...others}>
      {children}
    </h2>
  );
}

export default AlertTitle;
