import { OverlayProps } from '@/components/types/Overlay';
import './Overlay.scss';

/**
 * The overlay covers the entire screen in a semi-transparent black
 * color and is used in the implementation of dialogs and similar.
 * When clicked, the overlay will trigger an ``onClose``
 * prop event, which you can use to close your dialog or whatever
 * is using this overlay.
 */
function Overlay(props: OverlayProps): React.JSX.Element {
  const { className = '', onClose, open, ...others } = props;

  return (
    <div
      onClick={onClose}
      className={`component-overlay ${className} ${open ? '' : 'closed'}`}
      {...others}
    ></div>
  );
}

export default Overlay;
