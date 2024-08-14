import './Message.scss';
import { ChatRoomMessageProps } from '../types';
import Link from 'next/link';

function OtherUsersMessage(props: ChatRoomMessageProps): React.JSX.Element {
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
    <article className="chat-room-message other-user">
      <time className="chat-room-message-date">{date}</time>
      <div className="chat-room-message-content">
        <div className="chat-room-message-sender-username">
          <Link className="chat-room-message-sender-link" href={`/profile/${message.sender.id}`}>
            {message.sender.username}
          </Link>
        </div>
        <div>
          <span>{message.content}</span>
        </div>
      </div>
    </article>
  );
}

export default OtherUsersMessage;
