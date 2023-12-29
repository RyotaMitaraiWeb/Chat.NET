import { AlertContentProps } from './types';
import './AlertContent.scss';

function AlertContent(props: AlertContentProps): React.JSX.Element {
  const { className = '', children, ...others } = props;
  return (
    <div className={`component-alert-content ${className}`} {...others}>
      {children}
    </div>
  );
}

export default AlertContent;
