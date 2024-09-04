import { SignalrConnection } from './SignalrConnection';

export type chatHubClientMethods =
  | 'SendSessionData'
  | 'EndSession'
  | 'UpdateUser'
  | 'RoleUpdateSucceeded'
  | 'RoleUpdateFailed'
  | 'UserJoin'
  | 'UserLeave'
  | 'SendInitialChatRoomState'
  | 'MessageSent'
  | 'CommandFailed'
  | 'Ban'
  | 'Unban'
  | 'Warn';
export type chatHubServerMethods =
  | 'StartSession'
  | 'EndSession'
  | 'AddRoleToUser'
  | 'RemoveRoleFromUser'
  | 'JoinChatRoom'
  | 'LeaveChatRoom'
  | 'SendMessage'
  | 'BanUser'
  | 'WarnUser'
  | 'UnbanUser';

class ChatHubConnection extends SignalrConnection<chatHubClientMethods, chatHubServerMethods> {
  constructor() {
    super('chat-hub');
  }
}

/**
 * A singleton instance of a connection to the session hub.
 */
export const chatHubConnection = new ChatHubConnection();
