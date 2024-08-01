'use client';
import Drawer from '@/components/drawer/Drawer';
import List from '@/components/list/List';
import ListItemButton from '@/components/list/listItemButton/ListItemButton';
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
};

type SideNavigationProps = {
  open: boolean;
  onClose: () => void;
};

function SideNavigation(props: SideNavigationProps): React.JSX.Element {
  const links: SideNavigationLink[] = [
    {
      href: '/',
      text: 'Home',
      icon: <MdHome />,
    },
    {
      href: '/admin',
      text: 'Admin panel',
      icon: <MdAdminPanelSettings />,
    },
    {
      href: '/chat/search',
      text: 'Search chat rooms',
      icon: <MdSearch />,
    },
    {
      href: '/profile/admin',
      text: 'My profile',
      icon: <MdPersonOutline />,
    },
    {
      href: '/auth/login',
      text: 'Login',
      icon: <MdLogin />,
    },
    {
      href: '/auth/register',
      text: 'Register',
      icon: <MdPersonAdd />,
    },
    {
      text: 'Sign out',
      icon: <MdExitToApp />,
    },
  ];

  return (
    <Drawer side="left" open={props.open} onClose={props.onClose}>
      <List outlined size="large">
        {links.map((l) => (
          <ListItemButton
            className="side-navigation-button side-navigation-link"
            key={l.text}
            icon={l.icon}
            href={l.href}
            onClick={l.onClick}
          >
            {l.text}
          </ListItemButton>
        ))}
        <ListItemButton inset className="side-navigation-button" onClick={props.onClose}>
          Close menu
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default SideNavigation;
