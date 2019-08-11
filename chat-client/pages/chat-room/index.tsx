import React, { memo, Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { chatActions } from 'chat-client/store';
import { Layout, Navbar, Sidebar } from 'chat-client/shared/components';
import View from './view';

const getChatState = state => state.chat;

interface LocalProps {
  roomInfoApi: any;
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
    console.log('STATE: ', this.props);
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
