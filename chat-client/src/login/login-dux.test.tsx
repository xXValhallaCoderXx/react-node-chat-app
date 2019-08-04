import { Action } from 'redux';
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { LoginActionTypes, loginSuccess, loginError, loginReducer, initialState } from './login-dux';

const buildStore = configureStore([thunk]);

describe('Login Redux Actions', () => {
  it('should create an action: loginSuccess', () => {
    const response = {
      data: 'We have some data',
    };
    const expectedAction = {
      type: LoginActionTypes.FETCH_SUCCESS,
      payload: response,
    };
    expect(loginSuccess(response)).toEqual(expectedAction);
  });

  it('should create an action: loginError', () => {
    const errorText = 'Some error message';
    const expectedAction = {
      type: LoginActionTypes.FETCH_ERROR,
      payload: errorText,
    };
    expect(loginError(errorText)).toEqual(expectedAction);
  });
});

const action: Action<any> = { type: '' };
describe('Login Reducer State Changes', () => {
  it('should return the initial state', () => {
    expect(loginReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle FETCH REQUEST', () => {
    expect(
      loginReducer(initialState, {
        type: LoginActionTypes.FETCH_REQUEST,
      }),
    ).toEqual({
      data: {},
      error: '',
      loading: true,
      success: false,
    });
  });

  it('should handle FETCH SUCCESS', () => {
    const mockData = {
      email: 'renate',
      token: '1234',
    };
    expect(
      loginReducer(initialState, {
        type: LoginActionTypes.FETCH_SUCCESS,
        payload: mockData,
      }),
    ).toEqual({
      ...initialState,
      data: mockData,
    });
  });

  it('should handle FETCH ERROR', () => {
    expect(
      loginReducer(initialState, {
        type: LoginActionTypes.FETCH_ERROR,
        payload: 'Error has occured',
      }),
    ).toEqual({
      ...initialState,
      error: 'Error has occured',
    });
  });
});

describe('Login Async Actions', () => {
  let store;
  
  beforeEach(() => {
    store = buildStore(initialState);
  })
})