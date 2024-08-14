'use client';
import Drawer from '@/components/drawer/Drawer';
import List from '@/components/list/List';
import ListItemButton from '@/components/list/listItemButton/ListItemButton';
import { ChatUser } from '@/types/chat';

type UsersOnlineListProps = {
  users: ChatUser[];
  open: boolean;
  onClose: () => void;
};

function UsersOnlineList(props: UsersOnlineListProps): React.JSX.Element {
  return (
    <Drawer side="right" open={props.open} onClose={props.onClose}>
      <List size="large">
        {props.users.map((u) => (
          <ListItemButton key={u.id}>{u.username}</ListItemButton>
        ))}
        <ListItemButton onClick={props.onClose}>Close menu</ListItemButton>
      </List>
    </Drawer>
  );
}

export default UsersOnlineList;
