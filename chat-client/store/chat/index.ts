import { actionCreator } from 'chat-client/shared/utils/redux-helpers';
import PROTOCOLS from 'chat-shared/socket-types';
import { Reducer } from 'redux';

export enum ChatActionTypes {
  RECIEVE_MESSAGE = '@@chat/RECIEVE_MESSAGE',
}

export interface ChatState {
  messages: any;
}

export const actions = {
  recieveMessage: (data: any) => actionCreator(ChatActionTypes.RECIEVE_MESSAGE, data),
  subcribeMessages: () => {
    return (dispatch: any) =>
      dispatch({
        subscribe: true,
        event: PROTOCOLS.SERVER_TO_CLIENT_MSG,
        handle: (data: any) =>
          dispatch({
            type: PROTOCOLS.SERVER_TO_CLIENT_MSG,
            payload: data,
          }),
      });
  },
};

export const initialState: ChatState = {
  messages: [],
};

export const reducer: Reducer<ChatState> = (state = initialState, action): ChatState => {
  switch (action.type) {
    case ChatActionTypes.RECIEVE_MESSAGE: {
      const { messages } = action.payload;
      return { ...state, messages };
    }
    default: {
      return state;
    }
  }
};
