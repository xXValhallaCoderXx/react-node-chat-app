import { Action } from 'redux';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { actions, AuthActionTypes, initialState, reducer, loginRequest } from './index';

const mockStore = configureStore([thunk]);

const payload = {
  isOnline: true,
  email: 'hello@gmail.com',
  username: 'user',
  token: '12345',
};

describe('User Actions', () => {
  it('should create an action: LOGIN_REQUEST', () => {
    const expectedAction = {
      type: AuthActionTypes.LOGIN_REQUEST,
    };
    expect(loginRequest()).toEqual(expectedAction);
  });
});

// TODO - Check this test is correct
const action: Action<any> = { type: '' };
describe('Auth Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, action)).toEqual(initialState);
  });
});

describe('async actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall(); // Clear HTTP Mocks after each test
  });

  it('it handles failed logins', () => {
    const store = mockStore(initialState);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 500, response: 'This is a server error' });
    });

    const expectedActions = [
      {
        type: AuthActionTypes.LOGIN_REQUEST,
      },
      {
        type: AuthActionTypes.LOGIN_ERROR,
        payload: 'This is a server error',
      },
    ];
    return store.dispatch(actions.loginApi({ email: '', password: '' })).then(() => {
      expect(store.getActions()).toMatchObject(expectedActions);
    });
  });
});
