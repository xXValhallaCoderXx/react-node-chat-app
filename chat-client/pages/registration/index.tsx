import React from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from 'chat-client/store';
import { Layout } from 'chat-client/shared/components';
import View from './view';

export interface InitUser {
  isOnline: boolean;
  email: string;
  token: string;
  username: string;
}

const RegisterContainer = () => {
  const dispatch = useDispatch();

  const initializeUser = ({ isOnline, email, token, username }: InitUser) => {
    dispatch(userActions.userInit({ isOnline, email, token, username }));
  };
  return <Layout content={<View initUser={initializeUser} />} />;
};

export default RegisterContainer;
