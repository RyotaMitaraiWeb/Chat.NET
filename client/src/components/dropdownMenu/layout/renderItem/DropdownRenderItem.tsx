import { DropdownRenderItemProps } from './types';
import './DropdownRenderItem.scss';

function parseValueIntoId(value: string) {
  return value.replace(/ /g, '-');
}

function DropdownRenderItem(props: DropdownRenderItemProps): React.JSX.Element {
  const { children, onClick, value, currentValue, focusedValue } = props;
  return (
    <div
      key={value}
      id={`option-${parseValueIntoId(value)}`}
      data-value={value}
      className={`dropdown-menu-option
        ${currentValue === value ? 'selected' : 'not-selected'}
        ${value === focusedValue ? 'focused' : 'not-focused'}`}
      aria-selected={currentValue === value}
      role="option"
      onClick={onClick}
    >
      <div className="render-item">{children}</div>
    </div>
  );
}

export default DropdownRenderItem;
