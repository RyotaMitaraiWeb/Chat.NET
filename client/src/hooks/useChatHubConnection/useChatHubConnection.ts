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

  async function start() {
    await chatHubConnection.start();
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


  useEffect(() => {
    return () => {
      if (removeAllEventListenersOnDestroy) {
        for (const eventListener of eventListeners) {
          const { event, callback } = eventListener;
          dispatch({ type: 'remove', event, callback });
          chatHubConnection.off(event);
        }
      }
    };
  }, [eventListeners, removeAllEventListenersOnDestroy]);

  return {
    start,
    startSession,
    endSession,
    onSendSessionData,
    onEndSession,
    offEndSession,
    offSendSessionData,
    onUpdateUser,
    offUpdateUser,
  };
};
