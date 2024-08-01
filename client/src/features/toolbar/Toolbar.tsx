'use client';
import './Toolbar.scss';
import MenuButton from './menu/MenuButton';
import ToolbarHome from './home/ToolbarHome';
import SettingsButton from './settings/SettingsButton';
import LogoutButton from './logout/LogoutButton';

function Toolbar(): React.JSX.Element {
  return (
    <nav className="toolbar">
      <MenuButton />
      <ToolbarHome />
      <div aria-hidden={true} className="spacing"></div>
      <SettingsButton />
      <LogoutButton />
    </nav>
  );
}

export default Toolbar;
