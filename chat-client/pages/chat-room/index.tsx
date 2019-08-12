import React, { memo, Component } from 'react';
import { connect } from 'react-redux';

import { chatActions } from 'chat-client/store';

import View from './page';
import { NoRoom } from './atoms';
import { Layout, Navbar, Sidebar } from 'chat-client/shared/components';

import { RouteComponentProps } from 'react-router-dom';
import {User, Members, Messages} from "chat-client/shared/types";

const getChatState = state => state.chat.fetchRoomStatus;
const getChatMessages = (state, ownProps) => state.chat.rooms[ownProps.match.params.uid].messages;
const getChatMembers = (state, ownProps) => state.chat.rooms[ownProps.match.params.uid].members;
const getCurrentUser = (state) => state.user

const roomName = 'Asgardians';

interface LocalProps {
  roomInfoApi: any;
  sendMessage: any;
  status: any;
  messages: Messages[];
  members: Members[];
  user: User;
}

interface RouteProps {
  uid: string;
}

type Props = LocalProps & RouteComponentProps<RouteProps>;

const links = [
  {label: "Logout", path: "/"}
]

class LoginContainer extends Component<Props, {}> {
  componentDidMount() {
    this.props.roomInfoApi({ uid: this.props.match.params.uid });
  }
  render() {
    return <Layout sidebar={this.handleSidebar()} header={<Navbar links={links} />} content={this.handleContent()} />;
  }

  handleSidebar = () => {
    const { status, members } = this.props;
    return status.error ? null : <Sidebar roomName={roomName} members={members} />;
  };

  handleContent = () => {
    const { status, sendMessage, messages, user } = this.props;
    console.log("USER: ", user);
    const {uid} = this.props.match.params;
    return status.error ? <NoRoom message="Room not found!" /> : <View user={user} roomUid={uid} sendMessage={sendMessage} messages={messages} />;
  };
}

export default connect(
  (state, ownProps) => ({
    status: getChatState(state),
    messages: getChatMessages(state, ownProps),
    members: getChatMembers(state, ownProps),
    user: getCurrentUser(state)
  }),
  {
    sendMessage: chatActions.sendMessage,
    roomInfoApi: chatActions.fetchRoomInfo,
  },
)(LoginContainer);
