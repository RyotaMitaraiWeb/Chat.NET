import { SignalrConnection } from './SignalrConnection';

export type chatHubClientMethods =
  | 'SendSessionData'
  | 'EndSession'
  | 'UpdateUser'
  | 'RoleUpdateSucceeded'
  | 'RoleUpdateFailed';
export type chatHubServerMethods =
  | 'StartSession'
  | 'EndSession'
  | 'AddRoleToUser'
  | 'RemoveRoleFromUser';

class ChatHubConnection extends SignalrConnection<chatHubClientMethods, chatHubServerMethods> {
  constructor() {
    super('chat-hub');
  }
}

/**
 * A singleton instance of a connection to the session hub.
 */
export const chatHubConnection = new ChatHubConnection();
