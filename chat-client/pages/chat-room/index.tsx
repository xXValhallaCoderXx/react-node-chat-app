import React, { Component } from 'react';
import { connect } from 'react-redux';

import { chatActions, socketActions } from 'chat-client/store';
import { parseRoomData } from './selectors';

import View from './page';
import { NoRoom } from './atoms';
import { Navbar, Layout, Sidebar } from 'chat-client/shared/components';

import { RouteComponentProps } from 'react-router-dom';
import { User, Room } from 'chat-client/shared/types';

const getChatState = state => state.chat.fetchRoomStatus;
const getCurrentUser = state => state.user;

interface LocalProps {
  subscribeMessages: () => void;
  subscribeRoomUpdates: () => void;
  socketConnect: (token: string) => void;
  roomInfoApi: any;
  sendMessage: any;
  status: any;
  user: User;
  room: Room;
}

interface RouteProps {
  uid: string;
}

type Props = LocalProps & RouteComponentProps<RouteProps>;

const links = [{ label: 'Logout', path: '/' }];

class LoginContainer extends Component<Props, {}> {
  componentDidMount() {
    if (this.props.user.token) {
      this.props.socketConnect(this.props.user.token);
      this.props.subscribeMessages();
      this.props.subscribeRoomUpdates();
      this.props.roomInfoApi({ uid: this.props.match.params.uid });
    } else {
      this.props.history.push('/');
    }
  }
  render() {
    return <Layout sidebar={this.handleSidebar()} header={<Navbar links={links} />} content={this.handleContent()} />;
  }

  handleSidebar = () => {
    const { status, room } = this.props;
    return status.error ? null : <Sidebar roomName={room.name} members={room.members} />;
  };

  handleContent = () => {
    const { status, sendMessage, user, room } = this.props;
    return status.error ? (
      <NoRoom message="Room not found!" />
    ) : (
      <View user={user} room={room} sendMessage={sendMessage} />
    );
  };
}

export default connect(
  (state, ownProps) => ({
    status: getChatState(state),
    user: getCurrentUser(state),
    room: parseRoomData(state, ownProps),
  }),
  {
    sendMessage: chatActions.sendMessage,
    roomInfoApi: chatActions.fetchRoomInfo,
    socketConnect: socketActions.connectSocket,
    subscribeMessages: chatActions.subcribeMessages,
    subscribeRoomUpdates: chatActions.subscribeRoomUpdates,
  },
)(LoginContainer);
