import React, { memo } from 'react';
import { Container } from 'reactstrap';
import { ChatBubble } from './components';

interface Props {
  messages: any;
}

const ChatRoomView = ({messages}: Props) => {
  return (
    <Container className="pt-4 ml-n3">
      {/* <ChatBubble author="Admin" createdAt="12/1/1">
        This is some text
      </ChatBubble>
      <ChatBubble author="Admin" createdAt="12/1/1">
        This is some text
      </ChatBubble> */}
      {messages.map(ChatBubble)}
    </Container>
  );
};

export default memo(ChatRoomView);
