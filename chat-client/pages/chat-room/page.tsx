import React, { memo } from 'react';
import { Container, Col } from 'reactstrap';
import { ChatBubble } from './atoms';
import {MessageInput} from "./organisms";

interface Props {
  messages: any;
  sendMessage: any;
  roomUid: string;
}

const ChatRoomPage = ({ messages, sendMessage, roomUid }: Props) => {
  return (
    <Container fluid className="pt-4 ml-n3 h-100">
      <Col className="p-0" md="10">{messages.map(ChatBubble)}</Col>
      <MessageInput roomUid={roomUid} loading={false} sendMessage={sendMessage} />
    </Container>
  );
};

export default memo(ChatRoomPage);
