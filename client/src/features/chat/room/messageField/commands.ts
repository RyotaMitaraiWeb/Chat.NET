import { BanCommand, UnbanCommand, WarnCommand } from '@/types/commands';
import { MessageCommand } from './types';
import { chatHubConnection } from '@/signalr/ChatHubConnection';

export const commands: Record<string, MessageCommand> = {
  ban: {
    action(args, chatRoomId) {
      const command: Partial<BanCommand> = {
        chatRoomId,
        username: args.username,
        reason: args.reason,
      };

      return chatHubConnection.invoke('BanUser', command);
    },
  },
  warn: {
    action(args, chatRoomId) {
      const command: Partial<WarnCommand> = {
        chatRoomId,
        username: args.username,
        reason: args.reason,
      };

      return chatHubConnection.invoke('WarnUser', command);
    },
  },
  unban: {
    action(args, chatRoomId) {
      const command: Partial<UnbanCommand> = {
        chatRoomId,
        username: args.username,
      };

      return chatHubConnection.invoke('UnbanUser', command);
    },
  },
};
