import Button from '../Button';
import { IconButtonProps } from './types';
import './IconButton.scss';
import Icon from '@/components/icon/Icon';

/**
 * A button with special styling. Built on top of the ``Button`` component,
 * this one is designed for cases where you want a button with its only content
 * being an icon. The button is shaped as a circle.
 */
function IconButton(props: IconButtonProps): React.JSX.Element {
  const { className = '', children, size = 'medium', ...others } = props;
  return (
    <Button size={size} className={`component-icon-button ${className}`} {...others}>
      <Icon size={size}>{children}</Icon>
    </Button>
  );
}

export default IconButton;
