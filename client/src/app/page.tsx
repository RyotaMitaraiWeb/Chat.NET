'use client';
import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);

  const a = {
    a: "a"
  }

  return (
    <main>
      <p>test</p>
      The count is {count}
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </main>
  );
}
