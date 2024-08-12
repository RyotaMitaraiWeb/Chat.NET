export type ChatUser = {
  id: string;
  username: string;
};

export type ChatRoomInitialState = {
  users: ChatUser[];
};

export type Chat = {
  id: number;
  title: string;
  description: string;
};
