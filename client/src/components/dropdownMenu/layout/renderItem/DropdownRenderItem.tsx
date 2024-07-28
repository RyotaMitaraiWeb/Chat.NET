import { DropdownRenderItemProps } from './types';
import './DropdownRenderItem.scss';
import Icon from '@/components/icon/Icon';
import { MdCheck } from 'react-icons/md';
import { _parseValueIntoId } from '../_parseValueIntoId';

function DropdownRenderItem(props: DropdownRenderItemProps): React.JSX.Element {
  const { children, onClick, value, currentValue, focusedValue } = props;
  return (
    <div
      key={value}
      id={`option-${_parseValueIntoId(value)}`}
      data-value={value}
      className={`dropdown-menu-option
        ${currentValue === value ? 'selected' : 'not-selected'}
        ${value === focusedValue ? 'focused' : 'not-focused'}`}
      aria-selected={currentValue === value}
      role="option"
      onClick={onClick}
    >
      <div className="render-item">{children}</div>
      <Icon aria-hidden={true} style={{ opacity: currentValue === value ? 1 : 0 }} size="large">
        <MdCheck />
      </Icon>
    </div>
  );
}

export default DropdownRenderItem;
