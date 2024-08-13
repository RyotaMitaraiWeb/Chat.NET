'use client';
import { ExtraSmallScreen, LargeScreen } from '@/components/screen/Screen';
import './MessageField.scss';
import IconButton from '@/components/button/iconButton/IconButton';
import TextField from '@/components/textField/client/TextField';
import React, { useEffect, useRef, useState } from 'react';
import { MdSend } from 'react-icons/md';
import { chatHubConnection } from '@/signalr/ChatHubConnection';
import { SendMessage } from '@/types/chat';

type MessageFieldProps = {
  chatRoomId: number;
};

function MessageField(props: MessageFieldProps): React.JSX.Element {
  const [message, setMessage] = useState('');

  /*
    In order to send the message on Enter press without
    including the line break from the event,
    a "delayed" variant will be tracked here, which will be sent
    instead
  */
  const [actualMessage, setActualMessage] = useState(message);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    event.preventDefault();
    if (event.target.value !== '\n') {
      setMessage(event.target.value);
    }
  }

  function handleSubmit(event?: React.FormEvent) {
    event?.preventDefault();
    const messageToSend: SendMessage = {
      message: actualMessage,
      chatRoomId: props.chatRoomId,
    };

    chatHubConnection.invoke('SendMessage', messageToSend).then(() => {
      setMessage('');
      setActualMessage('');
      const field = form.current?.querySelector('#message-field') as HTMLElement;
      field.focus();
    });
  }

  /*
    <TextField> doesn't support forwardRef currently, so will be queried
    from here
  */
  const form = useRef<HTMLFormElement>(null);

  /*
    When the user sends a message (at which point the field will be cleared),
    bring them to the bottom of the page
  */
  useEffect(() => {
    if (!message) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [message]);

  function handleEnter(event: React.KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      if (message) {
        event.preventDefault();
        handleSubmit();
      }
    }

    setActualMessage(message);
  }

  return (
    <section>
      <form ref={form} className="chat-room-message-field" onSubmit={handleSubmit}>
        <TextField
          onChange={handleChange}
          value={message}
          autoresize
          placeholder="Type your message here..."
          className="message-field"
          size="large"
          name="message"
          onKeyUp={handleEnter}
          id="message-field"
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
            disabled={!message.trim()}
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
