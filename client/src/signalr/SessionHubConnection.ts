import { SignalrConnection } from './SignalrConnection';

export type sessionHubClientMethods = 'SendSessionData' | 'EndSession';
export type sessionHubServerMethods = 'StartSession' | 'EndSession';

class SessionHubConnection extends SignalrConnection<
  sessionHubClientMethods,
  sessionHubServerMethods
> {
  constructor() {
    super('session-hub');
  }
}

/**
 * A singleton instance of a connection to the session hub.
 */
export const sessionHubConnection = new SessionHubConnection();
