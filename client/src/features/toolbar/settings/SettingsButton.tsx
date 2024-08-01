import { MdSettings } from 'react-icons/md';
import ToolbarIcon from '../toolbarIcon/ToolbarIcon';

function SettingsButton(): React.JSX.Element {
  return (
    <ToolbarIcon label="Open settings menu">
      <MdSettings />
    </ToolbarIcon>
  );
}

export default SettingsButton;
