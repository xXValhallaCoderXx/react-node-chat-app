import React, { memo, Component } from 'react';
import { connect } from 'react-redux';
import { chatActions } from 'chat-client/store';
import { Layout, Navbar, Sidebar } from 'chat-client/shared/components';
import View from './view';

const getChatState = state => state.chat;

interface Props {
  roomInfoApi: any;
}

class LoginContainer extends Component<Props, {}> {
  componentDidMount(){
    this.props.roomInfoApi("123");
  }
  render() {
    return <Layout sidebar={<Sidebar />} header={<Navbar />} content={<View />} />;
  }
}

export default connect(
  state => ({
    status: getChatState(state),
  }),
  {
    roomInfoApi: chatActions.fetchRoomInfo,
  },
)(LoginContainer);
