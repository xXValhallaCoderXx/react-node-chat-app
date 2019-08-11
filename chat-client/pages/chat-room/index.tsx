import React, { memo } from 'react';
import { connect } from 'react-redux';
import { chatActions } from 'chat-client/store';
import { Layout, Navbar, Sidebar } from 'chat-client/shared/components';
import View from './view';

const getChatState = state => state.chat;

const LoginContainer = () => <Layout sidebar={<Sidebar />} header={<Navbar />} content={<View />} />;

export default connect(
  state => ({
    status: getChatState(state),
  }),
  {
    loginApi: chatActions.fetchRoomInfo,
  },
)(LoginContainer);
