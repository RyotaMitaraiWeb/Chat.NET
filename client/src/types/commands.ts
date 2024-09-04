export type BanCommand = {
  userId: string;
  username: string;
  chatRoomId: number;
  reason: string;
};

export type PunishmentNotification = {
  chatRoomId: number;
  chatRoomName: string;
  string?: string | null;
};
