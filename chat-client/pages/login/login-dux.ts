import { all, call, put, takeEvery } from 'redux-saga/effects';
import axios from "axios";
import { action } from 'typesafe-actions';
import { Reducer } from 'redux';

export enum LoginActionTypes {
  FETCH_REQUEST = '@@login/FETCH_REQUEST',
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

export const loginRequest = ({ email, password }: LoginRequest) => action(LoginActionTypes.FETCH_REQUEST, {email, password});
export const loginSuccess = (data: any) => action(LoginActionTypes.FETCH_SUCCESS, data);
export const loginError = (message: string) => action(LoginActionTypes.FETCH_ERROR, message);

function loginApi(values) {
  return axios.post('/api/auth/login', values, { withCredentials: true });
}

function* handleLogin(action) {
  try {
    // To call async functions, use redux-saga's `call()`.
    console.log("ACTION PAYLOAD: ", action);
    const res = yield call(loginApi, action.payload);

    if (res.error) {
      yield put(loginError(res.error));
    } else {
      yield put(loginSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(loginError(err.stack!));
    } else {
      yield put(loginError('An unknown error occured.'));
    }
  }
}

const initialState: LoginState = {
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

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
  yield takeEvery(LoginActionTypes.FETCH_REQUEST, handleLogin);
}

// We can also use `fork()` here to split our saga into multiple watchers.
export function* loginSaga() {
  yield all([call(watchFetchRequest)]);
}
