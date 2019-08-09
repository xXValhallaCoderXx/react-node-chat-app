import { combineReducers } from 'redux';
import { userReducer, authReducer } from 'chat-client/store';

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
