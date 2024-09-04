'use client';
import { createContext, useState } from 'react';
import { PunishmentNotificationContextType } from './types';
import { PunishmentNotification } from '@/types/commands';

export const PunishmentNotificationContext = createContext({} as PunishmentNotificationContextType);

export function PunishmentNotificationContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [notification, setNotification] = useState<PunishmentNotification>({
    chatRoomId: 0,
    chatRoomName: '',
  });

  const [isOpen, setOpen] = useState(false);

  function open(notification: PunishmentNotification) {
    setOpen(true);
    setNotification(notification);
  }

  function close() {
    setOpen(false);
  }

  return (
    <PunishmentNotificationContext.Provider value={{ isOpen, open, close, notification }}>
      {children}
    </PunishmentNotificationContext.Provider>
  );
}
