import { all, call, put, takeEvery } from 'redux-saga/effects';
import axios from "axios";
import { action } from 'typesafe-actions';
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

export const registerRequest = ({ email, password, username }: RegisterInput) => action(RegisterActionType.FETCH_REQUEST, {email, password, username});
export const registerSuccess = (data: any) => action(RegisterActionType.FETCH_SUCCESS, data);
export const registerError = (message: string) => action(RegisterActionType.FETCH_ERROR, message);

export function registerApi(values) {
  return axios.post('/api/auth/register', values, { withCredentials: true });
}

function* handleRegister(action) {
  console.log("HIT HERE")
  try {
    const res = yield call(registerApi, action.payload);
    if (res.error) {
      yield put(registerError(res.error));
    } else {
      yield put(registerSuccess(res));
    }
  } catch (err) {
    if (err) {
      // LOG err.stack
      yield put(registerError(err.response.data.message));
    } else {
      yield put(registerError('An unknown error occured.'));
    }
  }
}

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

export function* watchFetchRequest() {
  yield takeEvery(RegisterActionType.FETCH_REQUEST, handleRegister);
}

export function* registerSaga() {
  yield all([call(watchFetchRequest)]);
}
