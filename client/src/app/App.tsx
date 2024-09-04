'use client';
// eslint-disable-next-line max-len
import PunishmentNotificationDialog from '@/features/punishmentNotification/PunishmentNotificationDialog';
import { useInit } from '@/hooks/useInit/useInit';
import { useSession } from '@/hooks/useSession/useSession';

function App({ children }: { children: React.ReactNode }): React.JSX.Element {
  const { startSession } = useSession();

  useInit(() => {
    if (localStorage.getItem('access_token')) {
      startSession();
    }
  });

  return (
    <main>
      {children}
      <PunishmentNotificationDialog />
    </main>
  );
}

export default App;
