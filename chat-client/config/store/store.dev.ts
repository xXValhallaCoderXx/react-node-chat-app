import { createStore, applyMiddleware } from 'redux';
import {fork} from "redux-saga/effects";
import rootReducer from '../root-reducer';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import {loginSaga} from "chat-client/pages/login/login-dux";
import {registerSaga} from "chat-client/pages/register/register-dux";
// import { socketMiddleware } from 'chat-client/shared/dux/socket';


function* rootSaga () {
  yield [
      fork(loginSaga),
      fork(registerSaga),
  ];
}

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

  sagaMiddleware.run(rootSaga)
  return store;
}
