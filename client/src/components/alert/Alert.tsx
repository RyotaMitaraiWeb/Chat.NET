import { AlertProps } from './types';
import './Alert.scss';
import '@/styles/colors.scss';
import { severity } from '../types/options';
import { MdCheckCircleOutline, MdInfoOutline, MdErrorOutline, MdWarning } from 'react-icons/md';
import Icon from '../icon/Icon';
const icons: Record<severity, React.ReactNode> = {
  success: <MdCheckCircleOutline />,
  info: <MdInfoOutline />,
  error: <MdErrorOutline />,
  warning: <MdWarning />,
};

function Alert(props: AlertProps): React.JSX.Element {
  const { className = '', severity = 'success', icon, children, ...others } = props;
  const AlertIcon = icon || icons[severity];
  return (
    <div className={`component-alert ${className} ${severity}`} {...others}>
      <div className="alert-icon">
        <Icon size="large">{AlertIcon}</Icon>
      </div>
      <div className="alert-content">{children}</div>
    </div>
  );
}

export default Alert;
