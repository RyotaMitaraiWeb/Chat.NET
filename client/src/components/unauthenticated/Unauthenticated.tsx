'use client';

import React, { use } from 'react';
import { UnauthenticatedProps } from './types';
import { SessionContext } from '@/context/session/SessionContext';

/**
 * Renders the passed element only when the user is NOT authenticated
 */
function Unauthenticated(props: UnauthenticatedProps): React.JSX.Element {
  const { user } = use(SessionContext);

  if (user.id) {
    return <></>;
  }

  return <>{props.children}</>;
}

export default Unauthenticated;
