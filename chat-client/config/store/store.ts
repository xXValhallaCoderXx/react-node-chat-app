import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { routerMiddleware } from 'connected-react-router';
import socketMiddleware from 'chat-client/middleware/socket';
import thunk from 'redux-thunk';
import { rootReducer } from '../root-reducer';

import { history } from '../../routes';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['router', 'auth'] 
}

const persistedReducer = persistReducer(persistConfig, rootReducer(history))

export default function configureStore() {
  const store = createStore(
    persistedReducer,
    applyMiddleware(socketMiddleware(), routerMiddleware(history), thunk),
  );
  const persistor = persistStore(store)
  return {store, persistor};
}
