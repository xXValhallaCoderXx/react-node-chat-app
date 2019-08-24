import React, { memo } from 'react';
import { authActions } from 'chat-client/store';
import { useSelector, useDispatch } from 'react-redux';

import View from './view';
import { Layout } from 'chat-client/shared/components';

export interface OnSubmit {
  email: string;
  password: string;
}

export interface Status {
  loading: boolean;
  error: boolean;
  success: boolean;
  data: any;
}

const LoginContainer = () => {
  const dispatch = useDispatch();
  const status = useSelector((state: any) => state.auth.login);

  function onSubmit({email, password}: OnSubmit) {
    dispatch(authActions.loginApi({ email, password }));
  }
  return <Layout content={<View onSubmit={onSubmit} status={status} />} />;
};

export default memo(LoginContainer);
