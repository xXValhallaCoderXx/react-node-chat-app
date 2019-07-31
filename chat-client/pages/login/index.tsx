import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'chat-client/config/root-reducer';
import { Navabar, Layout } from 'chat-client/shared/components';
import { loginRequest } from './login-dux';
import LoginView from './login-view';


const LoginPageContainer = () => {
  const dispatch = useDispatch();
  const login = useSelector<AppState, any>(state => state.login);

  async function submitForm(email: string, password: string) {
    dispatch(loginRequest({email: "Sam@hotmail.com", password: "1234"}));
  }
  return <Layout header={<Navabar />} content={<LoginView error={login.error} submitForm={submitForm} />} />;
};

export default LoginPageContainer;
