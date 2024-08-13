export type ChatUser = {
  id: string;
  username: string;
};

export type ChatRoomInitialState = {
  users: ChatUser[];
  messages: ChatMessage[];
};

export type Chat = {
  id: number;
  title: string;
  description: string;
};

export type ChatMessage = {
  sender: ChatUser;
  date: string;
  id: number;
  chatRoomId: number;
  content: string;
};
