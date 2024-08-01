import { MdSettings } from 'react-icons/md';
import ToolbarIcon from '../toolbarIcon/ToolbarIcon';

function SettingsButton(): React.JSX.Element {
  return (
    <ToolbarIcon>
      <MdSettings />
    </ToolbarIcon>
  );
}

export default SettingsButton;
