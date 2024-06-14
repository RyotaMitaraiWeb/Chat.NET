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

export const useChatHubConnection = (options?: useChatHubConnectionOptions) => {
  const removeAllEventListenersOnDestroy = options?.removeAllEventListenersOnDestroy || false;
  const [eventListeners, dispatch] = useReducer(reducer, []);

  async function start() {
    await chatHubConnection.start();
  }

  async function onUpdateUser(callback: (data: unknown) => void) {
    dispatch({ type: 'add', event: 'UpdateUser', callback });
    chatHubConnection.on('UpdateUser', callback);
  }

  async function offUpdateUser(callback: (data: unknown) => void) {
    dispatch({ type: 'remove', event: 'UpdateUser', callback });
    chatHubConnection.on('UpdateUser', callback);
  }

  async function startSession() {
    await chatHubConnection.invoke('StartSession');
  }

  function onSendSessionData(callback: (data: unknown) => void) {
    dispatch({ type: 'add', event: 'SendSessionData', callback });
    chatHubConnection.on('SendSessionData', callback);
  }

  function onEndSession(callback: () => void) {
    dispatch({ type: 'add', event: 'EndSession', callback });
    chatHubConnection.on('EndSession', callback);
  }

  function offEndSession(callback: () => void) {
    dispatch({ type: 'remove', event: 'EndSession', callback });
    chatHubConnection.off('EndSession', callback);
  }

  function offSendSessionData(callback: (data: unknown) => void) {
    dispatch({ type: 'remove', event: 'SendSessionData', callback });
    chatHubConnection.off('SendSessionData', callback);
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
