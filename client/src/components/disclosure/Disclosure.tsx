import { DisclosureProps } from './types';
import './Disclosure.scss';
import Icon from '../icon/Icon';
import { MdOutlineArrowRight, MdOutlineArrowDropDown } from 'react-icons/md';

function Disclosure(props: DisclosureProps): React.JSX.Element {
  const {
    open,
    onClose,
    label,
    children,
    openLabel,
    closedLabel,
    className = '',
    padded,
    ...others
  } = props;

  const paddedClass = padded ? 'padded' : '';
  return (
    <details
      open={open}
      onClick={onClose}
      className={`component-disclosure ${paddedClass} ${className}`}
      {...others}
    >
      <summary>
        {label && !(closedLabel && openLabel) ? (
          <span className="disclosure-label persistent">{label}</span>
        ) : null}
        {openLabel && !label ? <span className="disclosure-label open">{openLabel}</span> : null}
        {closedLabel && !label ? (
          <span className="disclosure-label closed">{closedLabel}</span>
        ) : null}
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
