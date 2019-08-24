import React, { memo } from 'react';
import { authActions } from 'chat-client/store';
import { useSelector, useDispatch } from 'react-redux';

import View from './view';
import { Layout } from 'chat-client/shared/components';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const status = useSelector((state: any) => state.auth.login);

  function onSubmit(email: string, password: string) {
    dispatch(authActions.loginApi({ email, password }));
  }
  return <Layout content={<View onSubmit={onSubmit} status={status} />} />;
};

export default memo(LoginContainer);
