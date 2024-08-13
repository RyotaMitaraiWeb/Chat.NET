import './Message.scss';
import { ChatRoomMessageProps } from '../types';

function OwnMessage(props: ChatRoomMessageProps): React.JSX.Element {
  const message = props.message;
  return (
    <article className="chat-room-message own">
      <time className="chat-room-message-date">{message.date}</time>
      <div className="chat-room-message-content">
        <span>{message.content}</span>
      </div>
    </article>
  );
}

export default OwnMessage;
