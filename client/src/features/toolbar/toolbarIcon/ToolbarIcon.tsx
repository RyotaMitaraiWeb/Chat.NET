import IconButton from '@/components/button/iconButton/IconButton';
import { ExtraSmallScreen, LargeScreen } from '@/components/screen/Screen';
import './ToolbarIcon.scss';

type ToolbarIconProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
};

function ToolbarIcon(props: ToolbarIconProps): React.JSX.Element {
  return (
    <>
      <ExtraSmallScreen to="large">
        <IconButton
          className="toolbar-icon"
          onClick={props.onClick}
          href={props.href}
          variant="text"
          size="medium"
        >
          {props.children}
        </IconButton>
      </ExtraSmallScreen>
      <LargeScreen>
        <IconButton
          className="toolbar-icon"
          onClick={props.onClick}
          href={props.href}
          variant="text"
          size="large"
        >
          {props.children}
        </IconButton>
      </LargeScreen>
    </>
  );
}

export default ToolbarIcon;
