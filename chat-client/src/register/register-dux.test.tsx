import { Action } from 'redux';
import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from 'redux-mock-store';
import { initialState, registerReducer, RegisterActionType, registerError, registerApi } from './register-dux';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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
      request.respondWith({status: 500, response:{message: "This is a server error"}})
    })

    const expectedActions = [
      {
        type: RegisterActionType.FETCH_REQUEST
      },
      {
        type: RegisterActionType.FETCH_ERROR,
        payload: "This is a server error"
      }
    ]
    return store.dispatch(registerApi({email: "", password: "", username: ""})).then(() => {
      expect(store.getActions()).toMatchObject(expectedActions);
    });
  });
});