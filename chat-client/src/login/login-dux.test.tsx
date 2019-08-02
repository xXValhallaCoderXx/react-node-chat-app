import { Action } from 'redux';
import thunk from 'redux-thunk';
import { LoginActionTypes, loginSuccess, loginError, loginReducer, initialState, loginApi } from './login-dux';

describe('Login Actions', () => {
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
describe('Login Reducer', () => {
  it('should return the initial state', () => {
    expect(loginReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle FETCH ERROR', () => {
    expect(
      loginReducer(initialState, {
        type: LoginActionTypes.FETCH_ERROR,
        payload: 'Error has occured',
      }),
    ).toEqual({
      data: {},
      error: 'Error has occured',
      loading: false,
      success: false,
    });
  });
});
