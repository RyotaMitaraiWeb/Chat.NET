import Icon from '@/components/icon/Icon';
import { ComboboxProps } from './types';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { useAdjustComboboxWidth } from '@/components/internal/dropdownMenu/useAdjustComboboxWidth';
import './Combobox.scss';
import { forwardRef } from 'react';

const Combobox = forwardRef(function Combobox(props: ComboboxProps, ref) {
  const {
    onClick,
    className = '',
    open,
    onKeyDown,
    disabled,
    labelId,
    selectedValueElement,
    value,
    dropdownMenuRef,
    autoWidth,
    style = {},
    ...others
  } = props;

  const width = useAdjustComboboxWidth({ autoWidth, ref: dropdownMenuRef });

  return (
    <div
      onClick={onClick}
      className={`dropdown-menu-combobox ${open ? 'open' : 'closed'} ${className}`}
      aria-controls={`combobox-${labelId}`}
      aria-expanded={open}
      tabIndex={disabled ? -1 : 0}
      aria-activedescendant={value ? `option-${value}` : ''}
      role="combobox"
      onKeyDown={onKeyDown}
      style={{ width, ...style }}
      ref={ref as never}
      {...others}
    >
      <div className="dropdown-value">{selectedValueElement}</div>
      <Icon size="large" className="dropdown-icon" aria-hidden={true}>
        {!open ? <MdArrowDropDown /> : <MdArrowDropUp />}
      </Icon>
    </div>
  );
});

export default Combobox;
