import React, { Component } from 'react';
import { connect } from 'react-redux';

import { chatActions } from 'chat-client/store';
import {parseRoomData} from "./selectors";

import View from './page';
import { NoRoom } from './atoms';
import { Layout, Navbar, Sidebar } from 'chat-client/shared/components';

import { RouteComponentProps } from 'react-router-dom';
import { User, Room } from 'chat-client/shared/types';

const getChatState = state => state.chat.fetchRoomStatus;
const getRoomInfo = (state, ownProps) => state.chat.rooms[ownProps.match.params.uid];
const getCurrentUser = state => state.user;

interface LocalProps {
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
    this.props.roomInfoApi({ uid: this.props.match.params.uid });
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
    room: parseRoomData(state, ownProps)
  }),
  {
    sendMessage: chatActions.sendMessage,
    roomInfoApi: chatActions.fetchRoomInfo,
  },
)(LoginContainer);
