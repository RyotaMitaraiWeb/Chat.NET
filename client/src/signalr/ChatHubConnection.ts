import { SignalrConnection } from './SignalrConnection';

export type chatHubClientMethods = 'SendSessionData' | 'EndSession';
export type chatHubServerMethods = 'StartSession' | 'EndSession';

class ChatHubConnection extends SignalrConnection<chatHubClientMethods, chatHubServerMethods> {
  constructor() {
    super('chat');
  }
}

/**
 * A singleton instance of a connection to the session hub.
 */
export const chatHubConnection = new ChatHubConnection();
