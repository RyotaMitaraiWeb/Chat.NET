import { PunishmentNotification } from '@/types/commands';

export type PunishmentNotificationContextType = {
  open: (notification: PunishmentNotification) => void;
  close: () => void;
  isOpen: boolean;
  notification: PunishmentNotification;
};
