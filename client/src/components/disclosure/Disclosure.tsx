import { DisclosureProps } from './types';
import './Disclosure.scss';
import Icon from '../icon/Icon';
import { MdOutlineArrowRight, MdOutlineArrowDropDown } from 'react-icons/md';

function Disclosure(props: DisclosureProps): React.JSX.Element {
  const { open, onClose, label, children, className = '', padded, ...others } = props;

  const paddedClass = padded ? 'padded' : '';
  return (
    <details
      open={open}
      onClick={onClose}
      className={`component-disclosure ${paddedClass} ${className}`}
      {...others}
    >
      <summary>
        <span className="disclosure-label">{label}</span>
        <span className="disclosure-icon closed">
          <Icon size="large">
            <MdOutlineArrowRight />
          </Icon>
        </span>
        <span className="disclosure-icon open">
          <Icon size="large">
            <MdOutlineArrowDropDown />
          </Icon>
        </span>
      </summary>
      <div className="disclosure-body">{children}</div>
    </details>
  );
}

export default Disclosure;
