import React from 'react';

import { connect } from 'react-redux';
import FormController from './form-controller';
import { authActions } from 'chat-client/store';

const getRegisterStatus = state => state.auth.registration;

interface FormContainerProps {
  status: any;
  registerApi: any;
}

const FormContainer = ({ status, registerApi }: FormContainerProps) => {
  return <FormController status={status} registerApi={registerApi} />;
};

export default connect(
  state => ({
    status: getRegisterStatus(state),
  }),
  {
    registerApi: authActions.registerApi,
  },
)(FormContainer);
