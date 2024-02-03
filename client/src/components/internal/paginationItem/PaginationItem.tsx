import { cloneElement } from 'react';
import { PaginationItemProps } from './types';
import BaseButton from '../baseButton/BaseButton';

function PaginationItem(props: PaginationItemProps): React.JSX.Element {
  const { isSelected, page, disabled, onClick, component } = props;
  if (component) {
    return <CustomPageButton {...props} onClick={handleClick} />;
  }

  function handleClick(page: number) {
    if (!disabled) {
      onClick(page);
    }
  }

  return (
    <BaseButton
      data-page={page}
      disabled={disabled}
      className={`component-page-item ${isSelected ? 'selected' : ''}`}
      onClick={() => handleClick(page)}
      aria-label={`Go to page ${page}`}
    >
      {page}
    </BaseButton>
  );
}

function CustomPageButton(props: PaginationItemProps): React.JSX.Element {
  const { isSelected, page, disabled, onClick, component } = props;

  // CustomPageButton is created only if a component is passed
  const PureElement = cloneElement(component!);
  const PageButton = cloneElement(PureElement, {
    className: `${PureElement.props.className} component-page-item ${
      isSelected ? 'selected' : ''
    } ${disabled ? 'disabled' : ''}`,
    'data-page': page,
    onClick: () => onClick(page),
    key: page,
    'aria-label': `Go to page ${page}`,
    disabled,
    tabIndex: disabled ? -1 : 0,
  });

  return PageButton;
}

export default PaginationItem;
