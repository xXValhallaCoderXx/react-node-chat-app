import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../root-reducer';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import {loginSaga} from "chat-client/pages/login/login-dux";
// import { socketMiddleware } from 'chat-client/shared/dux/socket';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

  // HMR
  if (module.hot) {
    module.hot.accept('../root-reducer', () => {
      const nextReducer = require('../root-reducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  sagaMiddleware.run(loginSaga)
  return store;
}
