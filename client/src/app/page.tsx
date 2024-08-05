'use client';

import { SessionContext } from '@/context/session/SessionContext';
import { use } from 'react';

export default function Home() {
  const { user } = use(SessionContext);
  return (
    <main>
      <p>Test</p>
      <button onClick={() => console.log(user)}>Click me</button>
    </main>
  );
}
