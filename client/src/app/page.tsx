'use client';
import Button from '@/components/button/Button';
import IconButton from '@/components/button/iconButton/IconButton';
import { useChatHubConnection } from '@/hooks/useChatHubConnection/useChatHubConnection';
import { useInit } from '@/hooks/useInit/useInit';
import { chatHubConnection } from '@/signalr/ChatHubConnection';
import { useState } from 'react';
import { MdRestoreFromTrash } from 'react-icons/md';

export default function Home() {
  const [count, setCount] = useState(0);
  const { startSession, onSendSessionData, onEndSession } = useChatHubConnection();

  function test() {}

  useInit(() => {
    onSendSessionData(test);
    onEndSession(() => {});
    chatHubConnection.start().then(() => setTimeout(() => startSession(), 5000));
  });
  return (
    <main>
      <p>test</p>
      <p>The count is {count}</p>
      <Button icon={<MdRestoreFromTrash />} size="large" onClick={() => setCount(count + 1)}>
        Click me
      </Button>
      <Button onClick={() => setCount(count + 1)}>Click me</Button>
      <Button size="small" onClick={() => setCount(count + 1)}>
        Click me
      </Button>
      <div>
        <IconButton disabled size="large">
          <MdRestoreFromTrash />
        </IconButton>
        <IconButton size="medium">
          <MdRestoreFromTrash />
        </IconButton>
        <IconButton size="small">
          <MdRestoreFromTrash />
        </IconButton>
      </div>
    </main>
  );
}
