import { chatHubConnection } from '@/signalr/ChatHubConnection';

export const authService = {
  /**
   * Invokes a SignalR event to start the user's session and registers
   * an event listener for the session's start.
   */
  startSession(callback: (data: unknown) => void): void {
    chatHubConnection.on('SendSessionData', callback);
    chatHubConnection.invoke('StartSession');
  },
};
