'use client';

import React, { use } from 'react';
import { ChatRoomMessageProps } from './types';
import { SessionContext } from '@/context/session/SessionContext';
import OwnMessage from './variants/OwnMessage';
import OtherUsersMessage from './variants/OtherUsersMessage';

function ChatRoomMessage(props: ChatRoomMessageProps): React.JSX.Element {
  const { user } = use(SessionContext);

  if (user.id === props.message.sender.id) {
    return <OwnMessage message={props.message} />;
  }

  return <OtherUsersMessage message={props.message} />;
}

export default ChatRoomMessage;
