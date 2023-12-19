import { DialogFooterProps } from './types';
import './DialogFooter.scss';

/**
 * A sticky footer that stays at the bottom of the dialog. Typically
 * holds action buttons.
 */
function DialogFooter(props: DialogFooterProps): React.JSX.Element {
  const { className = '', children, ...others } = props;
  return (
    <div className={`component-dialog-footer ${className}`} {...others}>
      {children}
    </div>
  );
}

export default DialogFooter;
