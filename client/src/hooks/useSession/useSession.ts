import { SessionContext } from '@/context/session/SessionContext';
import { chatHubConnection } from '@/signalr/ChatHubConnection';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export const useSession = () => {
  const { setUser, restartUser } = use(SessionContext);
  const router = useRouter();

  async function startSession() {
    chatHubConnection
      .start()
      .then(() => {
        chatHubConnection.on('SendSessionData', setUser);
        chatHubConnection.invoke('StartSession');

        chatHubConnection.on('UpdateUser', setUser);
        chatHubConnection.on('EndSession', restartUser);
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
      });
  }

  return { startSession, endSession };
};
