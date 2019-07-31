import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../root-reducer';
import { socketMiddleware } from 'chat-client/shared/dux/socket';

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(socketMiddleware));
}
