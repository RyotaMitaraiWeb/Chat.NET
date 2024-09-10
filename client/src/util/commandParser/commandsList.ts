import { CommandsList } from './types';

export const commandList: Record<string, CommandsList> = {
  ban: {
    command: 'ban',
    validateArgs(args) {
      if (args.length !== 2) {
        return 'This command requires exactly two arguments';
      }

      return true;
    },
    argumentKeys: ['username', 'reason'],
  },
  warn: {
    command: 'warn',
    validateArgs(args) {
      if (args.length !== 2) {
        return 'This command requires exactly two arguments';
      }

      return true;
    },
    argumentKeys: ['username', 'reason'],
  },
  unban: {
    command: 'unban',
    validateArgs(args) {
      if (args.length !== 1) {
        return 'This command requires exactly one argument';
      }

      return true;
    },
    argumentKeys: ['username'],
  },
};
