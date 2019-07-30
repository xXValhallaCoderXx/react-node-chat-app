import React from 'react';
import { connect, useStore } from 'react-redux';
import { AppState } from 'chat-client/config/root-reducer';
import { Navabar, Layout } from 'chat-client/shared/components';
import { LoginState, thunkLoginRequest } from './login-dux';
import LoginView from './login-view';

interface LoginContainerProps {
  login: LoginState;
}

const LoginPageContainer = (props: LoginContainerProps) => {
  const store = useStore<AppState>();

  const { error } = store.getState().login;
  async function submitForm(email: string, password: string) {
    thunkLoginRequest(email, password);
  }
  return <Layout header={<Navabar />} content={<LoginView error={error} submitForm={submitForm} />} />;
};

const mapStateToProps = (state: AppState) => ({
  login: state.login,
});

const mapDispatchToProps = {
  thunkLoginRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPageContainer);
