import { MdExitToApp } from 'react-icons/md';
import ToolbarIcon from '../toolbarIcon/ToolbarIcon';

function LogoutButton(): React.JSX.Element {
  return (
    <ToolbarIcon>
      <MdExitToApp />
    </ToolbarIcon>
  );
}

export default LogoutButton;
