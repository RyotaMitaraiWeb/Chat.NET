import { MediumScreen, SmallScreen } from '@/components/screen/Screen';
import ToolbarIcon from '../toolbarIcon/ToolbarIcon';
import { MdHome } from 'react-icons/md';
import './ToolbarHome.scss';

function ToolbarHome(): React.JSX.Element {
  return (
    <>
      <SmallScreen to="medium">
        <ToolbarIcon href="/">
          <MdHome />
        </ToolbarIcon>
      </SmallScreen>
      <MediumScreen>
        <div className="toolbar-header">Chat.NET</div>
      </MediumScreen>
    </>
  );
}

export default ToolbarHome;
