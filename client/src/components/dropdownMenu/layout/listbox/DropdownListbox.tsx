import './DropdownListbox.scss';
import { DropdownListboxProps } from './types';

function DropdownListbox(props: DropdownListboxProps): React.JSX.Element {
  const { labelId, open, elementsToRender, className = '', id = '', style = {}, ...others } = props;
  return (
    <div className="listbox-container">
      <div
        role="listbox"
        aria-labelledby={labelId}
        className={`dropdown-menu-options ${className}`}
        id={`combobox-${labelId} ${id}`}
        style={{ visibility: open ? 'visible' : 'hidden', ...style }}
        tabIndex={-1}
        {...others}
      >
        {elementsToRender}
      </div>
    </div>
  );
}

export default DropdownListbox;
