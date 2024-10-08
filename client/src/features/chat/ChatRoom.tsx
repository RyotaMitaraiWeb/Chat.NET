'use client';
import './ChatRoom.scss';

import { chatHubConnection } from '@/signalr/ChatHubConnection';
import { Chat, ChatMessage, ChatRoomInitialState, ChatUser } from '@/types/chat';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import RoomHeader from './room/RoomHeader';
import ChatRoomMessage from './room/RoomBody/message/ChatRoomMessage';
import { usersOnlineReducer } from './reducers/usersOnlineReducer';
import { messagesReducer } from './reducers/messagesReducer';
import MessageField from './room/messageField/MessageField';
import Loader from '@/components/loader/Loader';
import { useRouter } from 'next/navigation';
import { useSnackbar } from '@/hooks/useSnackbar/useSnackbar';
import { SignalRError } from '@/types/global';
import { HttpStatusCode } from '@/constants/httpStatusCode';

type ChatRoomProps = {
  room: Chat;
};

function ChatRoom(props: ChatRoomProps): React.JSX.Element {
  const [users, dispatchUsers] = useReducer(usersOnlineReducer, []);
  const [messages, dispatchMessages] = useReducer(messagesReducer, []);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const snackbar = useSnackbar();

  const alphabetizedUserList = useMemo(() => {
    const alphabetizedUsers = [...users];
    alphabetizedUsers.sort((a, b) => a.username.localeCompare(b.username));
    return alphabetizedUsers;
  }, [users]);

  useEffect(() => {
    chatHubConnection
      .invoke('JoinChatRoom', { id: props.room.id })
      .then(() => {
        chatHubConnection.on('SendInitialChatRoomState', (state: ChatRoomInitialState) => {
          dispatchUsers({ type: 'populate', usersToPopulate: state.users });
          dispatchMessages({ type: 'populate', message: state.messages });
          setLoading(false);
        });

        chatHubConnection.on('UserJoin', (user: ChatUser) => {
          dispatchUsers({ type: 'add', user });
        });

        chatHubConnection.on('UserLeave', (user: ChatUser) => {
          dispatchUsers({ type: 'remove', user });
        });

        chatHubConnection.on('MessageSent', (message: ChatMessage) => {
          const chatBox = chatMessagesRef.current!;
          const isAtBottom = chatBox.scrollTop + chatBox.offsetHeight >= chatBox.scrollHeight - 120;
          dispatchMessages({ type: 'add', message });

          if (isAtBottom) {
            setTimeout(() => {
              chatBox.scrollTop = chatBox.scrollHeight;
            }, 200);
          }
        });

        chatHubConnection.on('UserIsBanned', (error: SignalRError) => {
          if (error.statusCode === HttpStatusCode.FORBIDDEN) {
            router.push('/');
            snackbar.error(error.message || '', 10_000);
          }
        });
      })
      .catch();

    return () => {
      chatHubConnection.invoke('LeaveChatRoom', { id: props.room.id });
      chatHubConnection.off('UserJoin');
      chatHubConnection.off('UserLeave');
      chatHubConnection.off('SendInitialChatRoomState');
      chatHubConnection.off('MessageSent');
      chatHubConnection.off('CommandFailed');
      chatHubConnection.off('UserIsBanned');
    };
  }, [props.room.id, snackbar, router]);

  const chatMessagesRef = useRef<HTMLElement>(null);

  if (isLoading) {
    return (
      <Loader
        size="large"
        text={`Loading chat room "${props.room.title}", please wait a moment!`}
      />
    );
  }

  return (
    <div className="chat-room">
      <RoomHeader room={props.room} users={alphabetizedUserList} />
      <section id="chat-room" ref={chatMessagesRef} className="chat-room-messages">
        {messages.map((m) => (
          <ChatRoomMessage message={m} key={m.id} />
        ))}
      </section>
      <MessageField chatRoomId={props.room.id} />
    </div>
  );
}

export default ChatRoom;
