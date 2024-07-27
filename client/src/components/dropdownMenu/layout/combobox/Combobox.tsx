import Icon from '@/components/icon/Icon';
import { ComboboxProps } from './types';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

function Combobox(props: ComboboxProps) {
  const {
    onClick,
    className = '',
    open,
    onKeyDown,
    disabled,
    labelId,
    selectedValueElement,
    value,
    ...others
  } = props;
  return (
    <div
      onClick={onClick}
      className={`dropdown-menu-selected-value ${open ? 'open' : 'closed'} ${className}`}
      aria-controls={`combobox-${labelId}`}
      aria-expanded={open}
      tabIndex={disabled ? -1 : 0}
      aria-activedescendant={value ? `option-${value}` : ''}
      role="combobox"
      onKeyDown={onKeyDown}
      {...others}
    >
      <div className="dropdown-value">{selectedValueElement}</div>
      <Icon size="large" className="dropdown-icon" aria-hidden={true}>
        {!open ? <MdArrowDropDown /> : <MdArrowDropUp />}
      </Icon>
    </div>
  );
}

export default Combobox;
