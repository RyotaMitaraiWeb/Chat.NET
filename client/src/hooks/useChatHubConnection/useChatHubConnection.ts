import { chatHubClientMethods, chatHubConnection } from '@/signalr/ChatHubConnection';
import { useEffect, useReducer } from 'react';

type eventListener = {
  event: chatHubClientMethods;
  callback: unknown;
};

type reducerAction = eventListener & { type: 'add' | 'remove' };

function reducer(state: eventListener[], action: reducerAction) {
  const { event, callback } = action;
  switch (action.type) {
    case 'add':
      return [...state, { event, callback }];

    case 'remove':
      return [...state].filter(
        (eventListener) => eventListener.callback === callback && eventListener.event,
      );
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
 * **Note:** it is best to register events inside hooks like ``useInit`` or
 * a similar mechanism for preventing infinite rerenders.
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

  function _addEventListener(
    event: chatHubClientMethods,
    callback: EventListenerCallback<unknown>,
  ) {
    dispatch({ type: 'add', event, callback });
    chatHubConnection.on(event, callback);
  }

  function _removeEventListener(
    event: chatHubClientMethods,
    callback: EventListenerCallback<unknown>,
  ) {
    dispatch({ type: 'remove', event, callback });
    chatHubConnection.off(event, callback);
  }

  function onUpdateUser(callback: EventListenerCallback<unknown>) {
    _addEventListener('UpdateUser', callback);
  }

  function offUpdateUser(callback: EventListenerCallback<unknown>) {
    _removeEventListener('UpdateUser', callback);
  }

  async function startSession() {
    await chatHubConnection.invoke('StartSession');
  }

  function onSendSessionData(callback: EventListenerCallback<unknown>) {
    _addEventListener('SendSessionData', callback);
  }

  function onEndSession(callback: EventListenerCallback<unknown>) {
    _addEventListener('EndSession', callback);
  }

  function offEndSession(callback: EventListenerCallback<unknown>) {
    _removeEventListener('EndSession', callback);
  }

  function offSendSessionData(callback: EventListenerCallback<unknown>) {
    _removeEventListener('SendSessionData', callback);
  }

  async function endSession() {
    await chatHubConnection.invoke('EndSession');
  }

  function onRoleUpdateSucceeded(callback: EventListenerCallback<unknown>) {
    _addEventListener('RoleUpdateSucceeded', callback);
  }

  function offRoleUpdateSucceeded(callback: EventListenerCallback<unknown>) {
    _removeEventListener('RoleUpdateFailed', callback);
  }

  function onRoleUpdateFailed(callback: EventListenerCallback<unknown>) {
    _addEventListener('RoleUpdateFailed', callback);
  }

  function offRoleUpdateFailed(callback: EventListenerCallback<unknown>) {
    _removeEventListener('RoleUpdateFailed', callback);
  }

  async function addRoleToUser(data: unknown) {
    await chatHubConnection.invoke('AddRoleToUser', data);
  }

  async function removeRoleFromUser(data: unknown) {
    await chatHubConnection.invoke('RemoveRoleFromUser', data);
  }

  useEffect(() => {
    return () => {
      if (removeAllEventListenersOnDestroy) {
        for (const eventListener of eventListeners) {
          const { event, callback } = eventListener;
          _removeEventListener(event, callback as never);
        }
      }
    };
  }, [eventListeners, removeAllEventListenersOnDestroy]);

  return {
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
