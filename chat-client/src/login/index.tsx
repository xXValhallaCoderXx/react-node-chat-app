import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'chat-client/config/root-reducer';
import { Navabar, Layout } from 'chat-client/shared/components';
import { loginApi } from './login-dux';
import LoginView from './login-view';


const LoginPageContainer = () => {
  const dispatch = useDispatch();
  const state = useSelector<AppState, any>(state => state.login);

  async function onSubmit({email, password}) {
    dispatch(loginApi({email, password}));
  }
  return <Layout header={<Navabar links={[{label: "hello", path: "/"}]} />} content={<LoginView  error={state.error} onSubmit={onSubmit} />} />;
};

export default LoginPageContainer;
