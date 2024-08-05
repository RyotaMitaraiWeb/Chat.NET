import { chatHubConnection } from '@/signalr/ChatHubConnection';
import { UserClaims } from '@/types/auth';

export const authService = {
  /**
   * Starts a connection with the socket server,
   * invokes a SignalR event to start the user's session and registers
   * an event listener for the session's start.
   */
  async startSession(callback: (data: UserClaims) => void): Promise<void> {
    return chatHubConnection.start().then(() => {
      chatHubConnection.on('SendSessionData', callback);
      return chatHubConnection.invoke('StartSession');
    });
  },
};
