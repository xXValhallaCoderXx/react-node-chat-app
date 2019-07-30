import { combineReducers } from 'redux';
import { loginReducer } from 'chat-client/pages/login/login-dux';

const rootReducer = combineReducers({
  login: loginReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
