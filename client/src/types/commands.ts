export type BanCommand = {
  userId: string;
  username: string;
  chatRoomId: number;
  reason: string;
};

export type WarnCommand = {
  userId: string;
  username: string;
  chatRoomId: number;
};

export type UnbanCommand = {
  userId: string;
  username: string;
  chatRoomId: number;
};

export type PunishmentNotification = {
  chatRoomId: number;
  chatRoomName: string;
  message?: string | null;
  title: string;
  details: string;
};
