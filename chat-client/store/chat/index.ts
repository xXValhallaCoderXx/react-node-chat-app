import { actionCreator } from 'chat-client/shared/utils/redux-helpers';
import { Reducer } from 'redux';

export enum ChatActionTypes {
  RECIEVE_MESSAGE = '@@chat/RECIEVE_MESSAGE',
}

export interface ChatState {
  messages: any;
}

export const actions = {
  recieveMessage: (data: any) => actionCreator(ChatActionTypes.RECIEVE_MESSAGE, data),
  testSubscribe: () => {
    return dispatch =>
      dispatch({
        subscribe: true,
        event: 'NEW_MESSAGE',
        handle: data =>
          dispatch({
            type: 'NEW_MESSAGE',
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