'use client';

import { SessionContext } from '@/context/session/SessionContext';
import { useInit } from '@/hooks/useInit/useInit';
import { authService } from '@/services/authService';
import { chatHubConnection } from '@/signalr/ChatHubConnection';
import { use } from 'react';

function App({ children }: { children: React.ReactNode }): React.JSX.Element {
  const { setUser, restartUser } = use(SessionContext);
  useInit(() => {
    chatHubConnection
      .start()
      .then(() => authService.startSession(setUser))
      .catch(() => restartUser());
  });

  return <main>{children}</main>;
}

export default App;
