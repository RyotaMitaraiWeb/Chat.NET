import BaseModal from '../internal/baseModal/BaseModal';
import { DrawerProps } from './types';
import './Drawer.scss';

/**
 * A modal menu that slides in and out from a desired side. Useful for
 * implementing features like a navigation menu.
 */
function Drawer(props: DrawerProps): React.JSX.Element {
  const { className = '', open, onClose, side = 'left', children, ...others } = props;

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      className={`component-drawer ${side} ${className}`}
      {...others}
    >
      {children}
    </BaseModal>
  );
}

export default Drawer;
