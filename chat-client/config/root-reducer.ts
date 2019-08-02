import { combineReducers } from 'redux';
import { loginReducer } from 'chat-client/src/login/login-dux';
import { registerReducer } from 'chat-client/src/register/register-dux';

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
