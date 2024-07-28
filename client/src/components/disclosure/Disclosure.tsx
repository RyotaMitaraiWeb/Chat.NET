'use client';
import { DisclosureProps } from './types';
import './Disclosure.scss';
import Icon from '../icon/Icon';
import { MdOutlineArrowRight, MdOutlineArrowDropDown } from 'react-icons/md';
import { useRef } from 'react';

/**
 * The disclosure is a component implementing the ``details`` tag with
 * a few added tools to make it easier to work with. Notable features:
 * - the arrow is now at the end of the summary, rather than at the beginning
 * - you can specify via props what the labels will be depending
 * on whether the disclosure is open or closed. Alternatively, you can
 * provide a persistent one that is shown in both cases.
 * - listen in on specific events (on open and on close)
 *
 * Note that, while the component exposes props like ``open``, ``onOpen``,
 * and ``onClose``, the disclosure does not provide a way to make it controlled
 * out of the box. Thus, those props do not prevent state change.
 *
 */
function Disclosure(props: DisclosureProps): React.JSX.Element {
  const {
    open,
    onOpen,
    onClose,
    label,
    children,
    openLabel,
    closedLabel,
    className = '',
    padded,
    ...others
  } = props;

  function handleToggle() {
    const open = details.current?.open;
    if (open === true && onOpen) {
      onOpen();
    } else if (open === false && onClose) {
      onClose();
    }
  }

  const details = useRef<HTMLDetailsElement>(null);

  const paddedClass = padded ? 'padded' : '';
  return (
    <details
      open={open}
      onToggle={handleToggle}
      className={`component-disclosure ${paddedClass} ${className}`}
      ref={details}
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
