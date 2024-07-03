import { ChipProps } from './types';
import './Chip.scss';
import { _generateClassName } from './_generateClassName';
import ChipBody from '../internal/chipBody/ChipBody';
import Icon from '../icon/Icon';
import BaseButton from '../internal/baseButton/BaseButton';
import { MdCancel } from 'react-icons/md';
import React from 'react';

function Chip(props: ChipProps): React.JSX.Element {
  const {
    onClick,
    onDelete,
    deleteIcon = <MdCancel />,
    startIcon,
    multiline,
    variant = 'fill',
    color,
    children,
    size = 'medium',
    disabled,
    href,
    target,
    className = '',
    clickable,
    deleteButtonLabel,
    ...others
  } = props;

  const chipClassNames = _generateClassName({
    multiline,
    variant,
    color,
    size,
    disabled,
    clickable,
    onDelete,
  });

  function handleKeyPress(event: React.KeyboardEvent) {
    event.preventDefault();
    if ((event.key === 'Backspace' || event.key === 'Delete') && onDelete) {
      onDelete();
    }
  }

  return (
    <div className={`component-chip ${chipClassNames} ${className}`} {...others}>
      <ChipBody
        href={href}
        target={target}
        onClick={onClick}
        clickable={clickable}
        startIcon={startIcon}
        disabled={disabled}
        className={chipClassNames}
        onKeyUp={handleKeyPress}
      >
        {children}
      </ChipBody>
      {onDelete ? (
        <BaseButton
          aria-label={deleteButtonLabel}
          disabled={disabled}
          className={`chip-delete-button ${chipClassNames}`}
          onClick={onDelete}
        >
          <Icon>{deleteIcon}</Icon>
        </BaseButton>
      ) : null}
    </div>
  );
}

export default Chip;
