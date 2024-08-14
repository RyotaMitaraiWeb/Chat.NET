import { type ChatMessage } from '@/types/chat';
import React from 'react';

type ChatMessageActionMultiple = {
  type: 'populate';
  message: ChatMessage[];
};

type ChatMessageAction = {
  type: 'add';
  message: ChatMessage;
};

export const messagesReducer: React.Reducer<
  ChatMessage[],
  ChatMessageAction | ChatMessageActionMultiple
> = (state, action) => {
  switch (action.type) {
    case 'populate':
      return action.message;

    case 'add':
      if (state.find((m) => m.id === action.message.id)) {
        return state;
      }

      return [...state, action.message];
  }
};
