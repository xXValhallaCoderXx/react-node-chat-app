import { Action } from 'redux';
import axios from 'axios';
import moxios from "moxios";
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import { LoginActionTypes, loginSuccess, loginError, loginReducer, initialState, loginApi } from './login-dux';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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

describe('async actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall(); // Clear HTTP Mocks after each test
  });

  it('it handles failed logins', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({status: 500, response:{message: "This is a server error"}})
    })

    const expectedActions = [
      {
        type: LoginActionTypes.FETCH_REQUEST
      },
      {
        type: LoginActionTypes.FETCH_ERROR,
        payload: "This is a server error"
      }
    ]
    return store.dispatch(loginApi({email: "", password: ""})).then(() => {
      expect(store.getActions()).toMatchObject(expectedActions);
      // console.log("STATEE: ", store.getState());
    });
  });
});
