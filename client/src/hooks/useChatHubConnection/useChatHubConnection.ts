import { chatHubClientMethods, chatHubConnection } from '@/signalr/ChatHubConnection';
import { useCallback, useEffect, useReducer } from 'react';

type eventListener = {
  event?: chatHubClientMethods;
  callback?: unknown;
};

type reducerAction = eventListener & { type: 'add' | 'remove' | 'restart' };

function reducer(state: eventListener[], action: reducerAction) {
  const { event, callback } = action;
  switch (action.type) {
    case 'add':
      return [...state, { event, callback }];

    case 'remove':
      return [...state].filter(
        (eventListener) => eventListener.callback === callback && eventListener.event,
      );
    case 'restart':
      return [];
  }
}

type useChatHubConnectionOptions = {
  removeAllEventListenersOnDestroy?: boolean;
};

type EventListenerCallback<TArgs> = (data: TArgs) => void | Promise<void>;

/**
 * A hook that provides a more friendly interface for the ``chatHubConnection``
 * by providing type safety for the different client and server events.
 *
 * For each client event, you have access to its "on" and "off" functions
 * with which to subscriбe and unsubscribe, respectively.
 *
 * **Note 1:** you should use the ``chatHubConnection`` object to initiate a
 * connection with the server (via the ``start`` method). The object
 * is a singleton and handles conflicts with already existing connections.
 *
 * **Note 2:** it is best to register events inside hooks like ``useInit`` or
 * a similar mechanism for preventing infinite rerenders.
 *
 * @param options - optional configurations for the particular instance of
 * the hook:
 * * ``removeAllEventListenersOnDestroy`` - if ``true``, this will unsubscribe
 * from all events you have registered when the hook is destroyed,
 * removing the need to manage this manually. Default: ``false``
 * @returns
 */
export const useChatHubConnection = (options?: useChatHubConnectionOptions) => {
  const removeAllEventListenersOnDestroy = options?.removeAllEventListenersOnDestroy || false;
  const [eventListeners, dispatch] = useReducer(reducer, []);

  const _addEventListener = useCallback(
    (event: chatHubClientMethods, callback: EventListenerCallback<unknown>) => {
      dispatch({ type: 'add', event, callback });
      chatHubConnection.on(event, callback);
    },
    [dispatch],
  );

  /**
   * Establishes a connection with the server
   */
  const startConnection = useCallback(() => {
    return chatHubConnection.start();
  }, []);

  /**
   * Cuts the connection with the server
   */
  const stopConnection = useCallback(() => {
    dispatch({ type: 'restart' });
    return chatHubConnection.stop();
  }, [dispatch]);

  const _removeEventListener = useCallback(
    (event: chatHubClientMethods, callback: EventListenerCallback<unknown>) => {
      dispatch({ type: 'remove', event, callback });
      chatHubConnection.off(event, callback);
    },
    [dispatch],
  );

  const onUpdateUser = useCallback(
    (callback: EventListenerCallback<unknown>) => {
      _addEventListener('UpdateUser', callback);
    },
    [_addEventListener],
  );

  const offUpdateUser = useCallback(
    (callback: EventListenerCallback<unknown>) => {
      _removeEventListener('UpdateUser', callback);
    },
    [_removeEventListener],
  );

  const startSession = useCallback(async () => {
    await chatHubConnection.invoke('StartSession');
  }, []);

  const onSendSessionData = useCallback(
    (callback: EventListenerCallback<unknown>) => {
      _addEventListener('SendSessionData', callback);
    },
    [_addEventListener],
  );

  const onEndSession = useCallback(
    (callback: EventListenerCallback<unknown>) => {
      _addEventListener('EndSession', callback);
    },
    [_addEventListener],
  );

  const offEndSession = useCallback(
    (callback: EventListenerCallback<unknown>) => {
      _removeEventListener('EndSession', callback);
    },
    [_removeEventListener],
  );

  const offSendSessionData = useCallback(
    (callback: EventListenerCallback<unknown>) => {
      _removeEventListener('SendSessionData', callback);
    },
    [_removeEventListener],
  );

  const endSession = useCallback(async () => {
    await chatHubConnection.invoke('EndSession');
  }, []);

  const onRoleUpdateSucceeded = useCallback(
    (callback: EventListenerCallback<unknown>) => {
      _addEventListener('RoleUpdateSucceeded', callback);
    },
    [_addEventListener],
  );

  const offRoleUpdateSucceeded = useCallback(
    (callback: EventListenerCallback<unknown>) => {
      _removeEventListener('RoleUpdateFailed', callback);
    },
    [_removeEventListener],
  );

  const onRoleUpdateFailed = useCallback(
    (callback: EventListenerCallback<unknown>) => {
      _addEventListener('RoleUpdateFailed', callback);
    },
    [_addEventListener],
  );

  const offRoleUpdateFailed = useCallback(
    (callback: EventListenerCallback<unknown>) => {
      _removeEventListener('RoleUpdateFailed', callback);
    },
    [_removeEventListener],
  );

  const addRoleToUser = useCallback(async (data: unknown) => {
    await chatHubConnection.invoke('AddRoleToUser', data);
  }, []);

  const removeRoleFromUser = useCallback(async (data: unknown) => {
    await chatHubConnection.invoke('RemoveRoleFromUser', data);
  }, []);

  useEffect(() => {
    return () => {
      if (removeAllEventListenersOnDestroy) {
        for (const eventListener of eventListeners) {
          const { event, callback } = eventListener;
          _removeEventListener(event as chatHubClientMethods, callback as never);
        }
      }
    };
  }, [eventListeners, removeAllEventListenersOnDestroy, _removeEventListener]);

  return {
    startConnection,
    stopConnection,
    startSession,
    endSession,
    onSendSessionData,
    onEndSession,
    offEndSession,
    offSendSessionData,
    onUpdateUser,
    offUpdateUser,
    onRoleUpdateSucceeded,
    offRoleUpdateSucceeded,
    onRoleUpdateFailed,
    offRoleUpdateFailed,
    addRoleToUser,
    removeRoleFromUser,
  };
};
