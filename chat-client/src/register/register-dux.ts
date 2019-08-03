import axios from 'axios';
import { history } from 'chat-client/routes';
import { actionCreator } from "chat-client/shared/utils";
import { Reducer } from 'redux';

export enum RegisterActionType {
  FETCH_REQUEST = '@@register/FETCH_REQUEST',
  FETCH_SUCCESS = '@@register/FETCH_SUCCESS',
  FETCH_ERROR = '@@register/FETCH_ERROR',
}

export interface RegisterState {
  loading: boolean;
  error: string;
  success: boolean;
  data: any;
}

interface RegisterInput {
  email: string;
  password: string;
  username: string;
}

export const registerRequest = () => actionCreator(RegisterActionType.FETCH_REQUEST);
export const registerSuccess = (data: any) => actionCreator(RegisterActionType.FETCH_SUCCESS, data);
export const registerError = (message: string) => actionCreator(RegisterActionType.FETCH_ERROR, message);

export const registerApi = ({ email, password, username }: RegisterInput) => async dispatch => {
  dispatch(registerRequest());
  try {
    const response = await axios.post('/api/auth/register', { email, password, username }, { withCredentials: true });
    dispatch(registerSuccess(response));
    history.push("/room/123")
  } catch (error) {
    dispatch(registerError(error.response.data.message));
  }
};

export const initialState: RegisterState = {
  loading: false,
  error: '',
  success: false,
  data: {},
};

export const registerReducer: Reducer<RegisterState> = (state = initialState, action): RegisterState => {
  switch (action.type) {
    case RegisterActionType.FETCH_REQUEST: {
      return { ...state, loading: true };
    }
    case RegisterActionType.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case RegisterActionType.FETCH_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};
