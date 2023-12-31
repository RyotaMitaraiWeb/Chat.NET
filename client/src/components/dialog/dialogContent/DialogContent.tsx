import './DialogContent.scss';
import { DialogContentProps } from './types';

/**
 * A wrapper for the main content of the dialog.
 */
function DialogContent(props: DialogContentProps): React.JSX.Element {
  const { className = '', children, ...others } = props;
  return (
    <section className={`component-dialog-content ${className}`} {...others}>
      {children}
    </section>
  );
}

export default DialogContent;
