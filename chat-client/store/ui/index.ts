import { actionCreator } from 'chat-client/shared/utils/redux-helpers';
import { Reducer } from 'redux';

export enum UiActionTypes {
  HANDLE_TOAST = '@@ui/HANDLE_TOAST',
}

export interface LoginState {
  toast: {
    color: string;
    message: string;
  };
}

interface HandleToast {
  color: string;
  message: string;
}

export const actions = {
  handleToast: (data: HandleToast) => actionCreator(UiActionTypes.HANDLE_TOAST, data),
};

export const initialState: LoginState = {
  toast: {
    color: '',
    message: '',
  },
};

export const reducer: Reducer<LoginState> = (state = initialState, action): LoginState => {
  switch (action.type) {
    case UiActionTypes.HANDLE_TOAST: {
      const { color, message } = action.payload;
      return { ...state, toast: { color, message } };
    }
    default: {
      return state;
    }
  }
};
