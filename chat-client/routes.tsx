import React, { lazy, Suspense, useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory as createHistory } from 'history';

import { LoadingScreen, InvalidUrlPage } from 'chat-client/shared/components';

const Login = lazy(() => import(/* webpackChunkName: "login" */ './pages/login'));
const Register = lazy(() => import(/* webpackChunkName: "register" */ './pages/registration'));
const ChatRoom = lazy(() => import(/* webpackChunkName: "chat-room" */ './pages/chat-room'));

export const history = createHistory();

const Application = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Suspense fallback={LoadingUI()}>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/chat/:uid" component={ChatRoom} />
          {/* <Route component={InvalidUrlPage} /> */}
        </Suspense>
      </Switch>
    </ConnectedRouter>
  );
};

const LoadingUI = () => <LoadingScreen />;
export default hot(module)(Application);
