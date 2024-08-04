import { UserClaims } from '@/types/auth';

export type SessionContext = {
  user: UserClaims;
  setUser: (user: UserClaims) => void;
};
