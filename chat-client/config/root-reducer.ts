import { combineReducers } from 'redux';
import { userReducer, authReducer, chatReducer, uiReducer } from 'chat-client/store';
import { connectRouter } from 'connected-react-router'

export const rootReducer = (history) => combineReducers({
  user: userReducer,
  auth: authReducer,
  chat: chatReducer,
  ui: uiReducer,
  router: connectRouter(history)
});

export type AppState = ReturnType<typeof rootReducer>;
