import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import socketMiddleware from 'chat-client/middleware/socket';
import thunk from 'redux-thunk';
import { rootReducer } from '../root-reducer';

import logger from 'redux-logger';
import { history } from '../../routes';
// import { socketMiddleware } from 'chat-client/shared/dux/socket';

export default function configureStore() {
  const store = createStore(
    rootReducer(history),
    applyMiddleware(socketMiddleware(), routerMiddleware(history), thunk, logger),
  );

  // HMR
  if (module.hot) {
    module.hot.accept('../root-reducer', () => {
      const nextReducer = require('../root-reducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
