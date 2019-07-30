import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import get from 'lodash/get';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_API_LOADING = 'LOGIN_API_LOADING';
const LOGIN_API_ERROR = 'LOGIN_API_ERROR';
const LOGIN_API_SUCCESS = 'LOGIN_API_SUCCESS';

/* ACTION TYPES */

export interface LoginTypes {
  email: string;
  password: string;
}

interface LoginRequestAction {
  type: typeof LOGIN_API_LOADING;
}

export interface ThunkLoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: {
    email: string;
    username: string;
  };
}

interface LoginErrorAction {
  type: typeof LOGIN_API_ERROR;
  payload: string;
}

interface LoginSuccessAction {
  type: typeof LOGIN_API_SUCCESS;
  payload: any;
}

export type LoginActions = LoginRequestAction | LoginErrorAction | LoginSuccessAction | ThunkLoginRequestAction;

/* THUNK ACTIONS */

// <Promise<Return Type>, State Interface, Type of Param, Type of Action> */
// export const thunkLoginRequest = (email: string, password: string) => {
//   return async (dispatch: Dispatch) => {
//     try {
//       dispatch(loginRequest());
//       const response = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
//     } catch (err) {
//       dispatch(loginError(get(err, 'response.data.message', 'Sorry and error occured')));
//     }
//   };
// };

export const loginRequestActionCreator: ActionCreator<
  ThunkAction<
    Promise<LoginSuccessAction>, // The type of the last action to be dispatched - will always be promise<T> for async actions
    any, // The type for the data within the last action
    null, // The type of the parameter for the nested function
    LoginSuccessAction // The type of the last action to be dispatched
  >
> = ({ email, password }: LoginTypes) => {
  return async (dispatch: Dispatch) => {
    const loginRequestAction: LoginRequestAction = {
      type: 'LOGIN_API_LOADING',
    };
    dispatch(loginRequestAction);
    const response = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
    const loginSuccess: LoginSuccessAction = {
      payload: response,
      type: 'LOGIN_API_SUCCESS',
    };
    return dispatch(loginSuccess);
  };
};

/* ACTION CREATORS */

export function loginRequest(): LoginRequestAction {
  return {
    type: LOGIN_API_LOADING,
  };
}

export function loginError(data: string): LoginErrorAction {
  return {
    type: LOGIN_API_ERROR,
    payload: data,
  };
}

export function loginSuccess(data: any): LoginSuccessAction {
  return {
    type: LOGIN_API_SUCCESS,
    payload: data,
  };
}

/* STATE */

export interface LoginState {
  loading: boolean;
  error: string;
  success: boolean;
  data: any;
}

const initialState: LoginState = {
  loading: false,
  error: '',
  success: false,
  data: {},
};

export function loginReducer(state = initialState, action: LoginActions): LoginState {
  switch (action.type) {
    case LOGIN_API_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_API_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGIN_API_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: action.payload,
      };
    default:
      return state;
  }
}
