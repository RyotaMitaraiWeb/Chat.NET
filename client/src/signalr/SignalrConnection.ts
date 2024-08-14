import * as signalr from '@microsoft/signalr';
import { ISignalrConnection } from './types';

type EventListener<T extends string> = {
  event: T;
  callback: (...args: never[]) => void | Promise<void>;
};

/**
 * Encapsulates the ``signalr`` connection and provides
 * support for strong typing. For each hub on the .NET backend,
 * you should create a separate class that inherits this one.
 */
export abstract class SignalrConnection<TC extends string, TS extends string>
  implements ISignalrConnection<TC, TS>
{
  private connection?: signalr.HubConnection;
  private hub;

  private events: EventListener<TC>[] = [];

  /**
   * @param hub A relative path to the hub (e.g. ``chat``). If the path
   * starts with ``/``, the slash will be removed.
   */
  constructor(hub: string) {
    if (hub.startsWith('/')) {
      hub = hub.slice(1);
    }

    this.hub = hub;
  }

  /**
   * Establishes a connection to the hub if one has not been established already
   */
  start(): Promise<void> {
    if (this.connection?.state !== signalr.HubConnectionState.Connected) {
      this.connection = new signalr.HubConnectionBuilder()
        .withUrl(`http://localhost:5000/${this.hub}`, {
          accessTokenFactory() {
            return localStorage.getItem('access_token') || '';
          },
          skipNegotiation: true,
          transport: signalr.HttpTransportType.WebSockets,
          withCredentials: true,
        })
        .withAutomaticReconnect()
        .build();
      return this.connection.start();
    }

    return Promise.resolve(undefined);
  }

  /**
   * Disconnects from the hub if there is an active connection to it.
   */
  stop(): Promise<void> {
    if (this.connection?.state === signalr.HubConnectionState.Connected) {
      return this.connection.stop();
    }

    return Promise.resolve(undefined);
  }

  async invoke(event: TS, ...args: unknown[]): Promise<void> {
    try {
      return await this.connection!.invoke(event, ...args);
    } catch (err) {
      asyncTimeout(() => this.invoke(event, ...args), 5000);
    }
  }

  on(event: TC, callback: (...args: never[]) => void): void {
    if (this.connection && !this.events.find((e) => e.callback === callback && e.event === event)) {
      this.connection.on(event, callback);
      this.events.push({ event, callback });
    }
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
      if (this.connection) {
        this.connection.off(event, method);
        this.events = this.events.filter((e) => e.event !== event && e.callback === method);
      }
    } else {
      if (this.connection) {
        this.connection.off(event);
        this.events = this.events.filter((e) => e.event !== event);
      }
    }
  }
}

const asyncTimeout = (callback: (...args: unknown[]) => void, timeout: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      Promise.resolve(callback()).then(() => {
        resolve(undefined);
      });
    }, timeout);
  });
