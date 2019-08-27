import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { routerMiddleware } from 'connected-react-router';
import socketMiddleware from 'chat-client/middleware/socket';
import thunk from 'redux-thunk';
import { rootReducer } from '../root-reducer';

import logger from 'redux-logger';
import { history } from '../../routes';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'] 
}

const persistedReducer = persistReducer(persistConfig, rootReducer(history))

export default function configureStore() {
  const store = createStore(
    persistedReducer,
    // rootReducer(history),
    applyMiddleware(socketMiddleware(), routerMiddleware(history), thunk, logger),
  );
  const persistor = persistStore(store)
  // HMR
  if (module.hot) {
    module.hot.accept('../root-reducer', () => {
      const nextReducer = require('../root-reducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return {store, persistor};
}
