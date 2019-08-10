import React from 'react';

import { connect } from 'react-redux';
import FormController from './form-controller';
import { authActions } from 'chat-client/store';

const getLoginStatus = state => state.auth.login;
const getHistory = state => state.router;

interface FormContainerProps {
  status: any;
  loginApi: any;
}

export interface FormValues {
  email?: string;
  password?: string;
}

const FormContainer = ({ status, loginApi }: FormContainerProps) => {
  return <FormController status={status} loginApi={loginApi} />;
};

export default connect(
  state => ({
    status: getLoginStatus(state),
  }),
  {
    loginApi: authActions.loginApi,
  },
)(FormContainer);
