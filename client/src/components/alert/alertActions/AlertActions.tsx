import { AlertActionsProps } from './types';
import './AlertActions.scss';

function AlertActions(props: AlertActionsProps): React.JSX.Element {
  const { className = '', children, ...others } = props;
  return (
    <div className={`component-alert-actions ${className}`} {...others}>
      {children}
    </div>
  );
}

export default AlertActions;
