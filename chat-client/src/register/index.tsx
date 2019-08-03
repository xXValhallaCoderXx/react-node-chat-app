import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'chat-client/config/root-reducer';
import { Navabar, Layout } from 'chat-client/shared/components';
import { registerApi } from './register-dux';
import RegisterView from './register-view';

const RegisterPageContainer = () => {
  const dispatch = useDispatch();
  const state = useSelector<AppState, any>(state => state.register);

  async function onSubmit({ username, email, password }) {
    dispatch(registerApi({ username, email, password }));
  }

  useEffect(() => {}, [state.loading]);

  return <Layout content={<RegisterView loading={state.loading} error={state.error} onSubmit={onSubmit} />} />;
};

export default RegisterPageContainer;
