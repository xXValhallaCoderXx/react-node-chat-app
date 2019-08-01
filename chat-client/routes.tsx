import React, { lazy, Suspense, useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import { useDispatch } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import { CONSTANTS } from 'chat-client/shared/constants';
// import { socketActions, chatActions } from 'chat-client/shared/dux';

import { LoadingScreen } from 'chat-client/shared/components';

const LazyLogin = lazy(() => import(/* webpackChunkName: "login" */ './pages/login'));
const LazyRegister = lazy(() => import(/* webpackChunkName: "register" */ './pages/register'));
// const LazyRoom = lazy(() => import(/* webpackChunkName: "room" */ './pages/room-chat'));
// const LazyPaint = lazy(() => import(/* webpackChunkName: "room" */ './pages/room-paint'));

const history = createHistory();

const Application = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem(CONSTANTS.VALHALLA_TOKEN);
    const username = localStorage.getItem(CONSTANTS.USERNAME);
    // On Initial Load - Check nothing in Local State
    if (token && username) {
      // Do not use window.location to redirect - This will cause remount
      // dispatch(socketActions.connect(token));
      // dispatch(socketActions.joinRoom({ username, room: 'valhalla' }));
      // dispatch(socketActions.joinRoom({ username, room: 'paint' }));
      // dispatch(chatActions.joinRoom({ room: 'valhalla', username }));
      // setLoading(false);
      // history.push('/room');
    }
    setLoading(false);
  }, []);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <Router history={history}>
      <Switch>
        <Suspense fallback={LoadingUI()}>
          <Route exact path="/" component={LazyLogin} />
          <Route exact path="/register" component={LazyRegister} />
          {/* 
          <Route exact path="/room/:uid" component={LazyRoom} />
          <Route exact path="/paint/:uid" component={LazyPaint} /> */}
        </Suspense>
      </Switch>
    </Router>
  );
};

const LoadingUI = () => <LoadingScreen />;
export default hot(module)(Application);
