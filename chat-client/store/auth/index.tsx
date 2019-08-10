import axios from 'axios';
import { actionCreator } from 'chat-client/shared/utils/redux-helpers';
import {authServices} from "chat-client/services";
import { Reducer } from 'redux';

export enum AuthActionTypes {
  LOGIN_REQUEST = '@@auth/LOGIN_REQUEST',
  LOGIN_ERROR = '@@auth/LOGIN_ERROR',
  LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS',
  REGISTER_REQUEST = '@@auth/REGISTER_REQUEST',
  REGISTER_ERROR = '@@auth/REGISTER_ERROR',
  REGISTER_SUCCESS = '@@auth/REGISTER_SUCCESS',
}

export interface AuthState {
  login: ApiCall;
  registration: ApiCall;
}

interface ApiCall {
  loading: boolean;
  error: boolean;
  success: boolean;
  data: any;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export const actions = {
  loginApi: ({ email, password }: LoginRequest) => async dispatch => {
    dispatch(loginRequest());
    try {
      const response = await authServices.loginApi({email, password});
      dispatch(loginSuccess(response));
    } catch (error) {
      dispatch(loginError(error));
    }
  },
  registerApi: ({ email, password, username }: RegisterRequest) => async dispatch => {
    dispatch(registerRequest());
    try {
      const response = await axios.post('/api/auth/register', { email, password, username }, { withCredentials: true });
      dispatch(registerSuccess(response));
    } catch (error) {
      dispatch(registerError(error.response.data.message));
    }
  },
};

export const loginRequest = () => actionCreator(AuthActionTypes.LOGIN_REQUEST);
export const loginSuccess = (data: any) => actionCreator(AuthActionTypes.LOGIN_SUCCESS, data);
export const loginError = (message: string) => actionCreator(AuthActionTypes.LOGIN_ERROR, message);
export const registerRequest = () => actionCreator(AuthActionTypes.REGISTER_REQUEST);
export const registerSuccess = (data: any) => actionCreator(AuthActionTypes.REGISTER_ERROR, data);
export const registerError = (message: string) => actionCreator(AuthActionTypes.REGISTER_SUCCESS, message);

export const initialState: AuthState = {
  login: {
    loading: false,
    success: false,
    error: false,
    data: null,
  },
  registration: {
    loading: false,
    success: false,
    error: false,
    data: null,
  },
};

export const reducer: Reducer<AuthState> = (state = initialState, action): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_REQUEST: {
      return { ...state, login: { loading: true, error: false, success: false, data: null } };
    }
    case AuthActionTypes.LOGIN_ERROR: {
      return { ...state, login: { loading: false, error: true, success: false, data: action.payload } };
    }
    case AuthActionTypes.LOGIN_SUCCESS: {
      return { ...state, login: { loading: false, error: false, success: true, data: null } };
    }
    case AuthActionTypes.REGISTER_REQUEST: {
      return { ...state, registration: { loading: true, error: false, success: false, data: null } };
    }
    case AuthActionTypes.REGISTER_ERROR: {
      return { ...state, registration: { loading: false, error: true, success: false, data: null } };
    }
    case AuthActionTypes.REGISTER_SUCCESS: {
      return { ...state, registration: { loading: false, error: false, success: true, data: null } };
    }
    default: {
      return state;
    }
  }
};