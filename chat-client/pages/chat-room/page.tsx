import React, { memo } from 'react';
import { Container, Col } from 'reactstrap';
import { ChatBubble } from './atoms';
import { MessageInput } from './organisms';

import { User, Messages, Room } from 'chat-client/shared/types';
const styles = require('./styles.module.scss');

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
    <div className={styles.chatMain}>
      <div className={styles.chatMessages}>{messageList()}</div>
      <div className={styles.compose}>
        <MessageInput roomUid={room.uid} loading={false} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default memo(ChatRoomPage);

{
  /* <div style={{ overflowY: 'auto', overflowX: 'hidden'}}>{messageList()}</div>
<div style={{ position: 'absolute', bottom: 0, marginBottom: 70, width: '97%' }}> */
}

// <Container fluid className="pt-4 ml-n3">
//   <Col style={{ overflowY: 'scroll', overflowX: 'hidden'}}>{messageList()}</Col>
//   <Col style={{ position: 'absolute', bottom: 0, marginBottom: 70 }}>
//     <MessageInput roomUid={room.uid} loading={false} sendMessage={sendMessage} />
//   </Col>
// </Container>
