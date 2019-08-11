import { actionCreator } from 'chat-client/shared/utils/redux-helpers';
import { chatRoomServices } from 'chat-client/services';
import { uiActions } from 'chat-client/store';
import PROTOCOLS from 'chat-shared/socket-types';
import { Reducer } from 'redux';

export enum ChatActionTypes {
  RECIEVE_MESSAGE = '@@chat/RECIEVE_MESSAGE',
  ROOM_INFO_REQUEST = '@@chat/ROOM_INFO_REQUEST',
  ROOM_INFO_ERROR = '@@chat/ROOM_INFO_ERROR',
  ROOM_INFO_SUCCESS = '@@chat/ROOM_INFO_SUCCESS',
}

export interface ChatState {
  messages: any;
  users: any;
}

interface FetchRoomInfo {
  uid: string;
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
  fetchRoomInfo: ({ uid }: FetchRoomInfo) => async dispatch => {
    dispatch(fetchRoomInfoRequest());
    try {
      const response = await chatRoomServices.roomInfoApi({ uid });
      dispatch(fetchRoomInfoSuccess(response));
    } catch (error) {
      dispatch(uiActions.handleToast({color: "danger", message: error.data.message}))
      dispatch(fetchRoomInfoError(error));
    }
  },
};

export const fetchRoomInfoRequest = () => actionCreator(ChatActionTypes.ROOM_INFO_REQUEST);
export const fetchRoomInfoSuccess = (data: any) => actionCreator(ChatActionTypes.ROOM_INFO_SUCCESS, data);
export const fetchRoomInfoError = (message: string) => actionCreator(ChatActionTypes.ROOM_INFO_ERROR, message);

export const initialState: ChatState = {
  messages: [],
  users: [],
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
