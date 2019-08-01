import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'chat-client/config/root-reducer';
import { Navabar, Layout } from 'chat-client/shared/components';
import { registerRequest } from './register-dux';
import RegisterView from './register-view';

const RegisterPageContainer = () => {
  const dispatch = useDispatch();
  const state = useSelector<AppState, any>(state => state.register);

  async function onSubmit({ email, password }) {
    dispatch(registerRequest({ email, password }));
  }
  return <Layout header={<Navabar />} content={<RegisterView error={state.error} onSubmit={onSubmit} />} />;
};

export default RegisterPageContainer;
