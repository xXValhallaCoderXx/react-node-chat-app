import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from 'chat-client/store';
import { Layout } from 'chat-client/shared/components';
import View from './view';

export interface SubmitRegistration {
  email: string;
  password: string;
  username: string;
}

export interface Status {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: any;
}

const RegisterContainer = () => {
  const dispatch = useDispatch();
  const status = useSelector((state: any) => state.auth.registration);

  const submitRegistration = ({ email, password, username }) => {
    dispatch(authActions.registerApi({ email, password, username }));
  };
  return <Layout content={<View submitRegistration={submitRegistration} status={status} />} />;
};

export default RegisterContainer;
