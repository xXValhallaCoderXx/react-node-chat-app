import { actionCreator } from 'chat-client/shared/utils/redux-helpers';
import { chatRoomServices } from 'chat-client/services';
import PROTOCOLS from 'chat-shared/socket-types';
import { Reducer } from 'redux';

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
  messages: any;
  users: any;
  fetchRoomStatus: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
}

interface FetchRoomInfo {
  uid: string;
}

export const actions = {
  joinRoom: (data: any) => {
    return {
      type: PROTOCOLS.JOIN_ROOM,
      emit: true,
      event: PROTOCOLS.JOIN_ROOM,
      payload: data
    };
  },
  sendMessage: (data: any) => {
    return {
      type: PROTOCOLS.JOIN_ROOM,
      emit: true,
      event: PROTOCOLS.JOIN_ROOM,
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
  messages: {},
  users: [],
  rooms: {},
};


export const reducer: Reducer<ChatState> = (state = initialState, action): ChatState => {
  switch (action.type) {
    case PROTOCOLS.SERVER_TO_CLIENT_MSG: {
      const { roomUid, uid, message, createdAt } = action.payload;
      const roomKey = state.rooms[roomUid];
      const newMessage = {uid, message, createdAt, author: "Admin"}
      return { ...state, rooms: {...state.rooms, [roomKey.uid]: {...roomKey, messages: [...state.rooms[roomUid].messages, newMessage]} } };
    }
    case ChatActionTypes.ROOM_INFO_REQUEST: {
      return { ...state, fetchRoomStatus: { loading: true, success: false, error: false } };
    }
    case ChatActionTypes.ROOM_INFO_SUCCESS: {
      const { uid, messages, members } = action.payload.data;
      const roomKey = state.rooms[uid];
      return { 
        ...state, 
        fetchRoomStatus: { loading: false, success: true, error: false },
        rooms: {...state.rooms, [roomKey.uid]: {...roomKey, members, messages: [...state.rooms[uid].messages, messages]} }
      };
    }
    case ChatActionTypes.ROOM_INFO_ERROR: {
      return { ...state, fetchRoomStatus: { loading: false, success: false, error: true } };
    }
    case ChatActionTypes.INIT_ROOMS: {
      return { ...state, rooms: action.payload };
    }
    default: {
      return state;
    }
  }
};
