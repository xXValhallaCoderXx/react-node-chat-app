import 'shared/styles/index.scss';
import React from 'react';
import { render } from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './routes';
import { Provider } from 'react-redux';
// @ts-ignore
import createStore from './config/store';

const root = document.getElementById('render-app');

export const { store, persistor } = createStore();

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>,
  root,
);
