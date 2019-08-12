import React, { memo, Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { chatActions, socketActions } from 'chat-client/store';
import { Layout, Navbar, Sidebar } from 'chat-client/shared/components';
import View from './page';
import { NoRoom } from './atoms';

const getChatState = state => state.chat.fetchRoomStatus;
const getChatMessages = (state, ownProps) => state.chat.rooms[ownProps.match.params.uid].messages;
const getChatMembers = (state, ownProps) => state.chat.rooms[ownProps.match.params.uid].members;

const roomName = 'Asgardians';

interface LocalProps {
  roomInfoApi: any;
  sendMessage: any;
  status: any;
  messages: any;
  members: any;
}

interface RouteProps {
  uid: string;
}

type Props = LocalProps & RouteComponentProps<RouteProps>;

const links = [
  {label: "Login", path: "/"}
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
    const { status, sendMessage, messages } = this.props;
    const {uid} = this.props.match.params;
    return status.error ? <NoRoom message="Room not found!" /> : <View roomUid={uid} sendMessage={sendMessage} messages={messages} />;
  };
}

export default connect(
  (state, ownProps) => ({
    status: getChatState(state),
    messages: getChatMessages(state, ownProps),
    members: getChatMembers(state, ownProps)
  }),
  {
    sendMessage: chatActions.sendMessage,
    roomInfoApi: chatActions.fetchRoomInfo,
  },
)(LoginContainer);
