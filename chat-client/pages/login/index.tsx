import React, {memo} from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from 'chat-client/store';
import { Layout } from 'chat-client/shared/components';
import View from './view';

const LoginContainer = () => {
  const dispatch = useDispatch();

  const initializeUser = ({ isOnline, email, token, username }) => {
    dispatch(userActions.userInit({ isOnline, email, token, username }));
  };
  return <Layout content={<View initUser={initializeUser} />} />;
};

export default memo(LoginContainer);
