'use client';
import './Toolbar.scss';
import MenuButton from './menu/MenuButton';
import ToolbarHome from './home/ToolbarHome';
import SettingsButton from './settings/SettingsButton';
import LogoutButton from './logout/LogoutButton';

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
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default Toolbar;
