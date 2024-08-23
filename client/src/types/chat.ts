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
  isFavorite: boolean;
};

export type ChatMessage = {
  sender: ChatUser;
  date: string;
  id: number;
  chatRoomId: number;
  content: string;
};

export type SendMessage = {
  message: string;
  chatRoomId: number;
};
