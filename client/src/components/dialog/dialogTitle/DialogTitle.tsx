import Heading from '@/components/heading/Heading';
import { DialogTitleProps } from './types';
import './DialogTitle.scss';

/**
 * A sticky title that describes the purpose of the dialog.
 */
function DialogTitle(props: DialogTitleProps): React.JSX.Element {
  const { className = '', children, ...others } = props;
  return (
    <header className={`component-dialog-title ${className}`} {...others}>
      <Heading level={2}>{children}</Heading>
    </header>
  );
}

export default DialogTitle;
