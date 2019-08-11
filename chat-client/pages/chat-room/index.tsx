import React, { memo, Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { chatActions } from 'chat-client/store';
import { Layout, Navbar, Sidebar } from 'chat-client/shared/components';
import View from './view';
import { NoRoom } from './components';

const getChatState = state => state.chat.fetchRoomStatus;

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
    return status.error ? null : <Sidebar />;
  };

  handleContent = () => {
    const { status } = this.props;
    return status.error ? <NoRoom message="Room not found!" /> : <View />;
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
