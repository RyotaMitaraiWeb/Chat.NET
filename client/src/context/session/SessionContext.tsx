'use client';
import { createContext, useState } from 'react';
import { type SessionContext as SessionContextType } from './types';
import { UserClaims } from '@/types/auth';

export const SessionContext = createContext({} as SessionContextType);

export function SessionContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [user, setUser] = useState<UserClaims>({ id: '', username: '', roles: [] });
  return <SessionContext.Provider value={{ user, setUser }}>{children}</SessionContext.Provider>;
}
