import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../root-reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
// import { socketMiddleware } from 'chat-client/shared/dux/socket';

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk, logger));

  // HMR
  if (module.hot) {
    module.hot.accept('../root-reducer', () => {
      const nextReducer = require('../root-reducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
