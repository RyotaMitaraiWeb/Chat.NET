'use client';
import { ExtraSmallScreen, LargeScreen } from '@/components/screen/Screen';
import './MessageField.scss';
import IconButton from '@/components/button/iconButton/IconButton';
import TextField from '@/components/textField/client/TextField';
import React, { useRef, useState } from 'react';
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

  const [sending, setSending] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    event.preventDefault();
    if (event.target.value !== '\n') {
      setMessage(event.target.value);
    }
  }

  function handleSubmit(event?: React.FormEvent) {
    setSending(true);
    event?.preventDefault();
    const messageToSend: SendMessage = {
      message: actualMessage,
      chatRoomId: props.chatRoomId,
    };

    chatHubConnection
      .invoke('SendMessage', messageToSend)
      .then(() => {
        setMessage('');
        setActualMessage('');
      })
      .finally(() => {
        setSending(false);
        const field = form.current?.querySelector('textarea') as HTMLTextAreaElement;

        // Focus when the DOM updates
        const timerId: ReturnType<typeof setInterval> = setInterval(() => {
          if (!field.disabled) {
            field.focus();
            clearInterval(timerId);
          }
        }, 500);
      });
  }

  /*
    <TextField> doesn't support forwardRef currently, so will be queried
    from here
  */
  const form = useRef<HTMLFormElement>(null);

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
          disabled={sending}
          value={message}
          autoresize
          placeholder="Type your message here..."
          className="message-field"
          size="large"
          name="message"
          onKeyUp={handleEnter}
          id="message-field"
          label={sending ? 'Sending message...' : undefined}
        />
        <ExtraSmallScreen to="large">
          <IconButton
            disabled={!message.trim() || sending}
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
            disabled={!message.trim() || sending}
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
