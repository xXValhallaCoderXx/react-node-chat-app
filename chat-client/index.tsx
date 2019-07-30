import 'shared/styles/main.scss';
import React from 'react';
import { render } from 'react-dom';
import Routes from './routes';
import { Provider } from 'react-redux';
// @ts-ignore
import createStore from './config/store';

const root = document.getElementById('render-app');

export const store = createStore();

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  root,
);
