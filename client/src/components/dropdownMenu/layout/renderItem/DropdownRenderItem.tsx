import { DropdownRenderItemProps } from './types';
import './DropdownRenderItem.scss';
import Icon from '@/components/icon/Icon';
import { MdCheck } from 'react-icons/md';

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
      <Icon style={{ visibility: currentValue === value ? 'visible' : 'hidden' }} size="large">
        <MdCheck />
      </Icon>
    </div>
  );
}

export default DropdownRenderItem;
