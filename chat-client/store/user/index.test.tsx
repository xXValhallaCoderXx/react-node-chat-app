import { Action } from 'redux';
import { actions, UserActionTypes, initialState, reducer } from './index';

const payload = {
  isOnline: true,
  email: 'hello@gmail.com',
  username: 'user',
  token: '12345',
};

describe('User Actions', () => {
  it('should create an action: USER_INIT', () => {
    const expectedAction = {
      type: UserActionTypes.USER_INIT,
      payload,
    };
    expect(actions.userInit(payload)).toEqual(expectedAction);
  });
});

const action: Action<any> = { type: '' };
describe('User Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, action)).toEqual(initialState);
  });

  it('should handle USER_INIT', () => {
    expect(
      reducer(initialState, {
        type: UserActionTypes.USER_INIT,
        payload,
      }),
    ).toEqual(payload);
  });
});
