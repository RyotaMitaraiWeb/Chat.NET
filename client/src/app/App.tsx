'use client';

import { useInit } from '@/hooks/useInit/useInit';
import { chatHubConnection } from '@/signalr/ChatHubConnection';

function App({ children }: { children: React.ReactNode }): React.JSX.Element {
  useInit(() => {
    chatHubConnection.start();
  });
  return <main>{children}</main>;
}

export default App;
