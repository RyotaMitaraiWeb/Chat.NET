'use client';

import { SessionContext } from '@/context/session/SessionContext';
import { useInit } from '@/hooks/useInit/useInit';
import { authService } from '@/services/authService';
import { use } from 'react';

function App({ children }: { children: React.ReactNode }): React.JSX.Element {
  const { setUser, restartUser } = use(SessionContext);
  useInit(() => {
    if (localStorage.getItem('access_token')) {
      authService.startSession(setUser).catch(restartUser);
    }
  });

  return <main>{children}</main>;
}

export default App;
