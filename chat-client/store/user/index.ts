import { actionCreator } from 'chat-client/shared/utils/redux-helpers';
import { Reducer } from 'redux';

export enum UserActionTypes {
  USER_INIT = '@@user/USER_INIT',
}

export interface LoginState {
  isOnline: boolean;
  email: string;
  token: string;
  username: string;
}

type UserInit = LoginState;

export const actions = {
  userInit: (data: UserInit) => actionCreator(UserActionTypes.USER_INIT, data),
};

export const initialState: LoginState = {
  isOnline: false,
  email: '',
  token: '',
  username: '',
};

export const reducer: Reducer<LoginState> = (state = initialState, action): LoginState => {
  switch (action.type) {
    case UserActionTypes.USER_INIT: {
      const { isOnline, token, email, username } = action.payload;
      return { ...state, isOnline, token, email, username };
    }
    default: {
      return state;
    }
  }
};
