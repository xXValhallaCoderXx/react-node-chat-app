import React, { memo } from 'react';
import { Container, Col } from 'reactstrap';
import { ChatBubble } from './atoms';
import { MessageInput } from './organisms';

import { User, Messages, Room } from 'chat-client/shared/types';

interface Props {
  user: User;
  room: Room;
  sendMessage: any;
}

const ChatRoomPage = ({ sendMessage, user, room }: Props) => {
  function messageList() {
    return room.messages.map((message: Messages, index: number) => (
      <ChatBubble key={index} message={message} currentUser={user.username} />
    ));
  }
  return (
    <Container fluid className="pt-4 ml-n3 h-100">
      <Col className="p-0">{messageList()}</Col>
      <MessageInput roomUid={room.uid} loading={false} sendMessage={sendMessage} />
    </Container>
  );
};

export default memo(ChatRoomPage);
