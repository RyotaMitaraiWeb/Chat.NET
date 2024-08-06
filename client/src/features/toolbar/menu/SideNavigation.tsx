'use client';
import Drawer from '@/components/drawer/Drawer';
import List from '@/components/list/List';
import ListItemButton from '@/components/list/listItemButton/ListItemButton';
import { SessionContext } from '@/context/session/SessionContext';
import { useSession } from '@/hooks/useSession/useSession';
import { use } from 'react';
import {
  MdAdminPanelSettings,
  MdExitToApp,
  MdHome,
  MdLogin,
  MdPersonAdd,
  MdPersonOutline,
  MdSearch,
} from 'react-icons/md';

type SideNavigationLink = {
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  text: string;

  /**
   * If not specified, this will always render
   */
  shouldRender?: () => boolean;
};

type SideNavigationProps = {
  open: boolean;
  onClose: () => void;
};

function SideNavigation(props: SideNavigationProps): React.JSX.Element {
  const { user } = use(SessionContext);
  const { endSession } = useSession();

  function onClick(callback: () => void) {
    props.onClose();
    callback();
  }

  const links: SideNavigationLink[] = [
    {
      href: '/',
      text: 'Home',
      icon: <MdHome />,
      onClick: props.onClose,
    },
    {
      href: '/admin',
      text: 'Admin panel',
      icon: <MdAdminPanelSettings />,
      shouldRender: () => user.roles.includes('Administrator'),
      onClick: props.onClose,
    },
    {
      href: '/chat/search',
      text: 'Search chat rooms',
      icon: <MdSearch />,
      onClick: props.onClose,
    },
    {
      href: `/profile/${user.username}`,
      text: 'My profile',
      icon: <MdPersonOutline />,
      shouldRender: () => user.id !== '',
      onClick: props.onClose,
    },
    {
      href: '/auth/login',
      text: 'Login',
      icon: <MdLogin />,
      shouldRender: () => user.id === '',
      onClick: props.onClose,
    },
    {
      href: '/auth/register',
      text: 'Register',
      icon: <MdPersonAdd />,
      shouldRender: () => user.id === '',
      onClick: props.onClose,
    },
    {
      text: 'Sign out',
      icon: <MdExitToApp />,
      onClick: onClick.bind(null, endSession),
      shouldRender: () => user.id !== '',
    },
  ];

  return (
    <Drawer side="left" open={props.open} onClose={props.onClose}>
      <List outlined size="large">
        {links.map((l) => (
          <LinkItem key={l.text} {...l} />
        ))}
        <ListItemButton inset className="side-navigation-button" onClick={props.onClose}>
          Close menu
        </ListItemButton>
      </List>
    </Drawer>
  );
}

function LinkItem(props: SideNavigationLink) {
  const item = (
    <ListItemButton
      className="side-navigation-button side-navigation-link"
      key={props.text}
      icon={props.icon}
      href={props.href}
      onClick={props.onClick}
    >
      {props.text}
    </ListItemButton>
  );

  if (props.shouldRender === undefined) {
    return item;
  }

  return props.shouldRender() ? item : <></>;
}

export default SideNavigation;
