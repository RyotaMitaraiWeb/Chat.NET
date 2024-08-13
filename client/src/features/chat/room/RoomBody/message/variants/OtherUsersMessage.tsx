import './Message.scss';
import { ChatRoomMessageProps } from '../types';
import Link from 'next/link';

function OtherUsersMessage(props: ChatRoomMessageProps): React.JSX.Element {
  const message = props.message;
  return (
    <article className="chat-room-message other-user">
      <time className="chat-room-message-date">{message.date}</time>
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
