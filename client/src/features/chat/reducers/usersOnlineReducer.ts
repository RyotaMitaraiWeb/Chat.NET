import { type ChatUser } from '@/types/chat';

type ChatUsersAction = {
  type: 'add' | 'remove' | 'populate';
  usersToPopulate?: ChatUser[];
  user?: ChatUser;
};

export const usersOnlineReducer: React.Reducer<ChatUser[], ChatUsersAction> = (state, action) => {
  switch (action.type) {
    case 'populate':
      return action.usersToPopulate!;
    case 'add':
      if (state.find((s) => s.id === action.user?.id)) {
        return state;
      }
      return [...state, action.user!];
    case 'remove':
      return state.filter((u) => u.id !== action.user?.id);
  }
};
