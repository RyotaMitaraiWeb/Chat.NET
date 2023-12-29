import { AlertProps } from './types';
import './Alert.scss';
import '@/styles/colors.scss';
import { severity } from '../types/options';
import { MdCheckCircleOutline, MdInfoOutline, MdErrorOutline, MdWarning } from 'react-icons/md';
import Icon from '../icon/Icon';
import AlertTitle from './alertTitle/AlertTitle';
import AlertActions from './alertActions/AlertActions';
import AlertContent from './alertContent/AlertContent';
const icons: Record<severity, React.ReactNode> = {
  success: <MdCheckCircleOutline />,
  info: <MdInfoOutline />,
  error: <MdErrorOutline />,
  warning: <MdWarning />,
};

function Alert(props: AlertProps): React.JSX.Element {
  const {
    className = '',
    severity = 'success',
    icon,
    children,
    alertActions,
    alertTitle,
    ...others
  } = props;

  const AlertIcon = icon || icons[severity];
  const title = alertTitle ? <AlertTitle>{alertTitle}</AlertTitle> : <></>;
  const actions = alertActions ? <AlertActions>{alertActions}</AlertActions> : <></>;
  return (
    <div className={`component-alert ${className} ${severity}`} {...others}>
      <div className="alert-icon title">
        <Icon size="large">{AlertIcon}</Icon>
        {title}
      </div>
      <div className="alert-content">
        <AlertContent>{children}</AlertContent>
        {actions}
      </div>
    </div>
  );
}

export default Alert;
