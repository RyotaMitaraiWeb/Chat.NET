import { MdSettings } from 'react-icons/md';
import ToolbarIcon from '../toolbarIcon/ToolbarIcon';

function SettingsButton(): React.JSX.Element {
  return (
    <ToolbarIcon href="/settings" label="Go to settings page">
      <MdSettings />
    </ToolbarIcon>
  );
}

export default SettingsButton;
