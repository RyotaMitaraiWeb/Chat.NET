'use client';
import { MdExitToApp } from 'react-icons/md';
import ToolbarIcon from '../toolbarIcon/ToolbarIcon';
import { useSession } from '@/hooks/useSession/useSession';

function LogoutButton(): React.JSX.Element {
  const { endSession } = useSession();

  function logout() {
    endSession().then(() => {
      localStorage.removeItem('access_token');
    });
  }

  return (
    <ToolbarIcon label="Logout" onClick={logout}>
      <MdExitToApp />
    </ToolbarIcon>
  );
}

export default LogoutButton;
