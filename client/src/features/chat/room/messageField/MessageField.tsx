'use client';
import { ExtraSmallScreen, LargeScreen } from '@/components/screen/Screen';
import './MessageField.scss';
import IconButton from '@/components/button/iconButton/IconButton';
import TextField from '@/components/textField/client/TextField';
import { useState } from 'react';
import { MdSend } from 'react-icons/md';
import { chatHubConnection } from '@/signalr/ChatHubConnection';
import { SendMessage } from '@/types/chat';

type MessageFieldProps = {
  chatRoomId: number;
};

function MessageField(props: MessageFieldProps): React.JSX.Element {
  const [message, setMessage] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    event.preventDefault();
    setMessage(event.target.value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const messageToSend: SendMessage = {
      message,
      chatRoomId: props.chatRoomId,
    };

    chatHubConnection.invoke('SendMessage', messageToSend);
  }

  return (
    <section>
      <form className="chat-room-message-field" onSubmit={handleSubmit}>
        <TextField
          onChange={handleChange}
          value={message}
          autoresize
          placeholder="Type your message here..."
          className="message-field"
          size="large"
        />
        <ExtraSmallScreen to="large">
          <IconButton
            disabled={!message}
            aria-label="Send message"
            color="primary"
            type="submit"
            size="medium"
          >
            <MdSend />
          </IconButton>
        </ExtraSmallScreen>
        <LargeScreen>
          <IconButton
            disabled={!message}
            aria-label="Send message"
            color="primary"
            type="submit"
            size="large"
          >
            <MdSend />
          </IconButton>
        </LargeScreen>
      </form>
    </section>
  );
}

export default MessageField;
