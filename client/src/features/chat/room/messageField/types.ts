export type MessageCommand = {
  action: (args: Record<string, string>, chatRoomId: number) => Promise<void>;
};
