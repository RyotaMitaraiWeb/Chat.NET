// eslint-disable-next-line max-len
import { PunishmentNotificationContext } from '@/context/punishmentNotification/PunishmentNotificationContext';
import { SessionContext } from '@/context/session/SessionContext';
import { chatHubConnection } from '@/signalr/ChatHubConnection';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export const useSession = () => {
  const { setUser, restartUser } = use(SessionContext);
  const { close, open } = use(PunishmentNotificationContext);
  const router = useRouter();

  async function startSession() {
    chatHubConnection
      .start()
      .then(() => {
        chatHubConnection.on('SendSessionData', setUser);
        chatHubConnection.invoke('StartSession');

        chatHubConnection.on('UpdateUser', setUser);
        chatHubConnection.on('EndSession', restartUser);
        chatHubConnection.on('Ban', open);
        chatHubConnection.on('Warn', open);
        chatHubConnection.on('Unban', open);
      })
      .catch(restartUser);
  }

  async function endSession() {
    chatHubConnection
      .invoke('EndSession')
      .then(() => chatHubConnection.stop())
      .then(() => {
        restartUser();
        router.push('/auth/login');
        close();
      });
  }

  return { startSession, endSession };
};
