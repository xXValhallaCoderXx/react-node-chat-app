import React, { memo, Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { chatActions } from 'chat-client/store';
import { Layout, Navbar, Sidebar } from 'chat-client/shared/components';
import View from './view';
import { NoRoom } from './components';

const getChatState = state => state.chat.fetchRoomStatus;
const roomName = 'Asgardians';
const members = [
  { name: 'hello', online: true },
  { name: 'goodbye', online: false },
  { name: 'Nate', online: true },
  { name: 'Nate', online: true },
  { name: 'Freyo', online: false },
  { name: 'Freyo2', online: false },
  { name: 'Freyo3', online: false },
  { name: 'Freyo4', online: true },
];
const messages = [
  { author: 'Admin', createdAt: '11/11/1', message: 'Hello world', uid: "1" },
  { author: 'Nate', createdAt: '11/11/1', message: 'Hello Cat', uid: "2" },
  { author: 'Cat', createdAt: '11/11/1', message: 'Hello Nate', uid: "3" },
];

interface LocalProps {
  roomInfoApi: any;
  status: any;
}

interface RouteProps {
  uid: string;
}

type Props = LocalProps & RouteComponentProps<RouteProps>;

class LoginContainer extends Component<Props, {}> {
  componentDidMount() {
    this.props.roomInfoApi({ uid: this.props.match.params.uid });
  }
  render() {
    return <Layout sidebar={this.handleSidebar()} header={<Navbar />} content={this.handleContent()} />;
  }

  handleSidebar = () => {
    const { status } = this.props;
    return status.error ? null : <Sidebar roomName={roomName} members={members} />;
  };

  handleContent = () => {
    const { status } = this.props;
    return status.error ? <NoRoom message="Room not found!" /> : <View messages={messages} />;
  };
}

export default connect(
  state => ({
    status: getChatState(state),
  }),
  {
    roomInfoApi: chatActions.fetchRoomInfo,
  },
)(LoginContainer);
