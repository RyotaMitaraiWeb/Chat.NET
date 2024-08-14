import './Message.scss';
import { ChatRoomMessageProps } from '../types';

function OwnMessage(props: ChatRoomMessageProps): React.JSX.Element {
  const message = props.message;
  const date = new Date(props.message.date).toLocaleString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    hour12: false,
    minute: 'numeric',
  });

  return (
    <article className="chat-room-message own">
      <time className="chat-room-message-date">{date}</time>
      <div className="chat-room-message-content">
        <span>{message.content}</span>
      </div>
    </article>
  );
}

export default OwnMessage;
