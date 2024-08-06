'use client';
import { MdExitToApp } from 'react-icons/md';
import ToolbarIcon from '../toolbarIcon/ToolbarIcon';
import { useSession } from '@/hooks/useSession/useSession';
import { useSnackbar } from '@/hooks/useSnackbar/useSnackbar';
import { snackbarMessages } from '@/constants/snackbarMessages';

function LogoutButton(): React.JSX.Element {
  const { endSession } = useSession();
  const snackbar = useSnackbar();

  function logout() {
    endSession().then(() => {
      localStorage.removeItem('access_token');
      snackbar.success(snackbarMessages.success.logout);
    });
  }

  return (
    <ToolbarIcon label="Logout" onClick={logout}>
      <MdExitToApp />
    </ToolbarIcon>
  );
}

export default LogoutButton;
