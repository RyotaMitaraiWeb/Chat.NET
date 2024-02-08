type SignalrInvokeMethod<TEvent> = (event: TEvent, ...args: Array<unknown>) => Promise<void>;

type SignalrOffMethod<TEvent> = (event: TEvent, method?: (...args: unknown[]) => void) => void;

export interface ISignalrConnection<TClientMethods, TServerMethods> {
  start: () => Promise<void>;
  stop: () => Promise<void>;
  invoke: SignalrInvokeMethod<TServerMethods>;
  off: SignalrOffMethod<TClientMethods>;
}
