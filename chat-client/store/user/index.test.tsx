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

// describe('async actions', () => {
//   beforeEach(() => {

//     moxios.install();
//   });
//   afterEach(() => {
//     moxios.uninstall(); // Clear HTTP Mocks after each test
//   });

//   it('it handles failed logins', () => {
//     const store = mockStore(initialState);
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({status: 500, response:{message: "This is a server error"}})
//     })

//     const expectedActions = [
//       {
//         type: RegisterActionType.FETCH_REQUEST
//       },
//       {
//         type: RegisterActionType.FETCH_ERROR,
//         payload: "This is a server error"
//       }
//     ]
//     return store.dispatch(registerApi({email: "", password: "", username: ""})).then(() => {
//       expect(store.getActions()).toMatchObject(expectedActions);
//     });
//   });
// });
