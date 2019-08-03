import { initialState, registerReducer, RegisterActionType, registerError } from './register-dux';
import { Action } from 'redux';

describe('Login Actions', () => {
  it('should create an action: registerError', () => {
    const errorText = 'Some error message';
    const expectedAction = {
      type: RegisterActionType.FETCH_ERROR,
      payload: errorText,
    };
    expect(registerError(errorText)).toEqual(expectedAction);
  });
});

const action: Action<any> = { type: '' };
describe('Register Reducer', () => {
  it('should return the initial state', () => {
    expect(registerReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle FETCH REQUEST', () => {
    expect(
      registerReducer(initialState, {
        type: RegisterActionType.FETCH_REQUEST,
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
      registerReducer(initialState, {
        type: RegisterActionType.FETCH_SUCCESS,
        payload: mockData,
      }),
    ).toEqual({
      ...initialState,
      data: mockData,
    });
  });

  it('should handle FETCH ERROR', () => {
    expect(
      registerReducer(initialState, {
        type: RegisterActionType.FETCH_ERROR,
        payload: 'Error has occured',
      }),
    ).toEqual({
      ...initialState,
      error: 'Error has occured',
    });
  });
});
