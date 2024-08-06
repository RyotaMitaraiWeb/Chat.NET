'use client';
import { use } from 'react';
import { AuthenticatedProps } from './types';
import { SessionContext } from '@/context/session/SessionContext';

/**
 * Renders the passed element only when the user is authenticated
 */
function Authenticated(props: AuthenticatedProps): React.JSX.Element {
  const { user } = use(SessionContext);

  if (!user.id) {
    return <></>;
  }

  return <>{props.children}</>;
}

export default Authenticated;
