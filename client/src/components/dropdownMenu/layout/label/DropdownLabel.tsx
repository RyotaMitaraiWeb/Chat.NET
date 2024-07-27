import React from 'react';
import { DropdownLabelProps } from './types';
import './DropdownLabel.scss';

function DropdownMenuLabel(props: DropdownLabelProps): React.JSX.Element {
  const { labelId, label, onClick, id = '', className = '', ...others } = props;

  if (!label) {
    return <></>;
  }

  return (
    <div
      onClick={onClick}
      id={`${labelId} ${id}`}
      className={`dropdown-menu-label ${className}`}
      {...others}
    >
      {label}
    </div>
  );
}

export default DropdownMenuLabel;
