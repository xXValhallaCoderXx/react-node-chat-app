import { combineReducers } from 'redux';
import { userReducer, authReducer } from 'chat-client/store';
import { connectRouter } from 'connected-react-router'

export const rootReducer = (history) => combineReducers({
  user: userReducer,
  auth: authReducer,
  router: connectRouter(history)
});

export type AppState = ReturnType<typeof rootReducer>;
