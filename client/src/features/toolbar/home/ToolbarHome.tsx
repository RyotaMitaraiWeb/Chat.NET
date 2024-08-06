import { ExtraSmallScreen, MediumScreen } from '@/components/screen/Screen';
import ToolbarIcon from '../toolbarIcon/ToolbarIcon';
import { MdHome } from 'react-icons/md';
import './ToolbarHome.scss';

function ToolbarHome(): React.JSX.Element {
  return (
    <>
      <ExtraSmallScreen to="medium">
        <ToolbarIcon href="/" label="Go to home page">
          <MdHome />
        </ToolbarIcon>
      </ExtraSmallScreen>
      <MediumScreen>
        <div className="toolbar-header">Chat.NET</div>
      </MediumScreen>
    </>
  );
}

export default ToolbarHome;
