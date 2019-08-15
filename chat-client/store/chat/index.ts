import { actionCreator } from 'chat-client/shared/utils/redux-helpers';
import { chatRoomServices } from 'chat-client/services';
import PROTOCOLS from 'chat-shared/socket-types';
import { Reducer } from 'redux';
import produce from 'immer';

export enum ChatActionTypes {
  INIT_ROOMS = '@@chat/INIT_ROOMS',
  RECIEVE_MESSAGE = '@@chat/RECIEVE_MESSAGE',
  SEND_MESSAGE = '@@chat/SEND_MESSAGE',
  ROOM_INFO_REQUEST = '@@chat/ROOM_INFO_REQUEST',
  ROOM_INFO_ERROR = '@@chat/ROOM_INFO_ERROR',
  ROOM_INFO_SUCCESS = '@@chat/ROOM_INFO_SUCCESS',
}

export interface ChatState {
  rooms: any;
  fetchRoomStatus: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
}

interface FetchRoomInfo {
  uid: string;
}

interface SendMessage {
  roomUid: string;
  message: string;
}

export const actions = {
  joinRoom: (data: any) => {
    return {
      type: PROTOCOLS.JOIN_ROOM,
      emit: true,
      event: PROTOCOLS.JOIN_ROOM,
      payload: data,
    };
  },
  sendMessage: ({roomUid, message}: SendMessage) => {
    return {
      type: PROTOCOLS.CLIENT_TO_SERVER_MSG,
      emit: true,
      event: PROTOCOLS.CLIENT_TO_SERVER_MSG,
      payload: {uid: roomUid, message}
    };
  },
  recieveMessage: (data: any) => actionCreator(PROTOCOLS.SERVER_TO_CLIENT_MSG, data),
  initRooms: (data: any) => actionCreator(ChatActionTypes.INIT_ROOMS, data),
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
      dispatch(fetchRoomInfoError(error));
    }
  },
};

export const fetchRoomInfoRequest = () => actionCreator(ChatActionTypes.ROOM_INFO_REQUEST);
export const fetchRoomInfoSuccess = (data: any) => actionCreator(ChatActionTypes.ROOM_INFO_SUCCESS, data);
export const fetchRoomInfoError = (message: string) => actionCreator(ChatActionTypes.ROOM_INFO_ERROR, message);

export const initialState: ChatState = {
  fetchRoomStatus: {
    loading: false,
    success: false,
    error: false,
  },
  rooms: {},
};

export const reducer: Reducer<ChatState> = (state = initialState, action): ChatState => {
  return produce(state, draftState => {
    switch (action.type) {
      case PROTOCOLS.SERVER_TO_CLIENT_MSG: {
        const { roomUid, uid, message, createdAt, username } = action.payload;
        const newMessage = { uid, message, createdAt, author: username };
        draftState.rooms[roomUid].messages.push(newMessage);
        break;
      }
      case ChatActionTypes.ROOM_INFO_REQUEST: {
        draftState.fetchRoomStatus = { loading: true, success: false, error: false };
        break;
      }
      case ChatActionTypes.ROOM_INFO_SUCCESS: {
        const { uid, messages, members } = action.payload.data;
        draftState.fetchRoomStatus = { loading: false, success: true, error: false };
        draftState.rooms[uid].members = members;
        draftState.rooms[uid].messages.concat(messages);
        break;
      }
      case ChatActionTypes.ROOM_INFO_ERROR: {
        draftState.fetchRoomStatus = { loading: false, success: false, error: true }
        break;
      }
      case ChatActionTypes.INIT_ROOMS: {
        draftState.rooms = action.payload;
        break;
      }
      default: {
        return state;
      }
    }
  });
};
