import * as signalr from '@microsoft/signalr';
import { ISignalrConnection } from './types';

/**
 * Encapsulates the ``signalr`` connection and provides
 * support for strong typing. For each hub on the .NET backend,
 * you should create a separate class that inherits this one.
 */
export abstract class SignalrConnection<TC extends string, TS extends string>
  implements ISignalrConnection<TC, TS>
{
  protected connection: signalr.HubConnection;
  private connectionIsActive = false;

  /**
   * @param hub A relative path to the hub (e.g. ``chat``). If the path
   * starts with ``/``, the slash will be removed.
   */
  constructor(hub: string) {
    if (hub.startsWith('/')) {
      hub = hub.slice(1);
    }

    this.connection = new signalr.HubConnectionBuilder()
      .withUrl(`http://localhost:5000/${hub}`, {
        accessTokenFactory() {
          return localStorage.getItem('access_token') || '';
        },
        skipNegotiation: true,
        transport: signalr.HttpTransportType.WebSockets,
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();
  }

  /**
   * Establishes a connection to the hub if one has not been established already
   */
  start() {
    if (!this.connectionIsActive) {
      this.connectionIsActive = true;
      return this.connection.start();
    }

    return Promise.resolve(undefined);
  }

  /**
   * Disconnects from the hub if there is an active connection to it.
   */
  stop() {
    if (this.connectionIsActive) {
      this.connectionIsActive = false;
      return this.connection.stop();
    }

    return Promise.resolve(undefined);
  }

  invoke(event: TS, ...args: unknown[]): Promise<void> {
    return this.connection.invoke(event, ...args);
  }

  on(event: TC, callback: (...args: never[]) => void): void {
    this.connection.on(event, callback);
  }

  /**
   * Deletes the specified handler from the connection. When you want
   * to pass different behaviors upon the invocation of the same event,
   * you should use named functions so that you can delete only that
   * behavior.
   * @param event
   * @param method if using named methods, only the specified ``method``
   * will be removed. If no ``method`` is specified, all handlers
   * attached to the event will be removed.
   */
  off(event: TC, method?: (...args: unknown[]) => void) {
    if (method) {
      this.connection.off(event, method);
    } else {
      this.connection.off(event);
    }
  }
}
