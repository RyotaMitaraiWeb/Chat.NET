'use client';
import './Toolbar.scss';
import MenuButton from './menu/MenuButton';
import ToolbarHome from './home/ToolbarHome';
import SettingsButton from './settings/SettingsButton';
import LogoutButton from './logout/LogoutButton';
import Authenticated from '@/components/authenticated/Authenticated';
import Unauthenticated from '@/components/unauthenticated/Unauthenticated';
import ToolbarIcon from './toolbarIcon/ToolbarIcon';
import { MdLogin } from 'react-icons/md';

function Toolbar(): React.JSX.Element {
  return (
    <nav className="toolbar">
      <ul>
        <li>
          <MenuButton />
        </li>
        <li>
          <ToolbarHome />
        </li>
        <div role="banner" aria-hidden={true} className="spacing"></div>
        <li>
          <SettingsButton />
        </li>
        <Authenticated>
          <li>
            <LogoutButton />
          </li>
        </Authenticated>
        <Unauthenticated>
          <li>
            <ToolbarIcon href="/auth/login" label="Go to login page">
              <MdLogin />
            </ToolbarIcon>
          </li>
        </Unauthenticated>
      </ul>
    </nav>
  );
}

export default Toolbar;
