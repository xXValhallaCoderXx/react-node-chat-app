import React from 'react';

import { connect } from 'react-redux';
import FormController from './form-controller';
import { authActions, socketActions, chatActions } from 'chat-client/store';

const getLoginStatus = state => state.auth.login;

interface FormContainerProps {
  status: any;
  loginApi: any;
  connect: any;
  subscribe: any;
}

export interface FormValues {
  email?: string;
  password?: string;
}

const FormContainer = ({ status, loginApi, connect, subscribe }: FormContainerProps) => {
  return <FormController subscribe={subscribe} status={status} loginApi={loginApi} connect={connect} />;
};

export default connect(
  state => ({
    status: getLoginStatus(state),
  }),
  {
    loginApi: authActions.loginApi,
    connect: socketActions.connectSocket,
    subscribe: chatActions.testSubscribe,
  },
)(FormContainer);
