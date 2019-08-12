import React, { memo } from 'react';
import { Container, Col } from 'reactstrap';
import { ChatBubble } from './atoms';
import { MessageInput } from './organisms';

import { User, Messages } from 'chat-client/shared/types';

interface Props {
  user: User;
  messages: Messages[];
  sendMessage: any;
  roomUid: string;
}

const ChatRoomPage = ({ messages, sendMessage, roomUid, user }: Props) => {
  function messageList() {
    return messages.map((message: Messages) => <ChatBubble message={message} currentUser={user.username} />);
  }
  return (
    <Container fluid className="pt-4 ml-n3 h-100">
      <Col className="p-0">
        {messageList()}
      </Col>
      <MessageInput roomUid={roomUid} loading={false} sendMessage={sendMessage} />
    </Container>
  );
};

export default memo(ChatRoomPage);
