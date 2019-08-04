import axios from 'axios';
import { history } from 'chat-client/routes';
import { actionCreator } from "chat-client/shared/utils";
import { Reducer } from 'redux';

export enum LoginActionTypes {
  FETCH_REQUEST = '@@login/REQUEST',
  FETCH_SUCCESS = '@@login/FETCH_SUCCESS',
  FETCH_ERROR = '@@login/FETCH_ERROR',
}

export interface LoginState {
  loading: boolean;
  error: string;
  success: boolean;
  data: any;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const loginRequest = () => actionCreator(LoginActionTypes.FETCH_REQUEST);
export const loginSuccess = (data: any) => actionCreator(LoginActionTypes.FETCH_SUCCESS, data);
export const loginError = (message: string) => actionCreator(LoginActionTypes.FETCH_ERROR, message);


export const loginApi = ({ email, password}: LoginRequest) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post('/api/auth/login', {email, password}, { withCredentials: true });
    dispatch(loginSuccess(response))
    history.push("/room/123")
  }catch(error) {
    dispatch(loginError(error.response.data.message))
  }
};

export const initialState: LoginState = {
  loading: false,
  error: '',
  success: false,
  data: {},
};

export const loginReducer: Reducer<LoginState> = (state = initialState, action): LoginState => {
  switch (action.type) {
    case LoginActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true };
    }
    case LoginActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case LoginActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};
