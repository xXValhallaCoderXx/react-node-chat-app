import React, { memo, useRef, useEffect } from 'react';
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
  const messagesEndRef = useRef(null);
  useEffect(scrollToBottom, [room]);
  function scrollToBottom() {
    try {
      // @ts-ignore
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.log('Error');
    }
  };
  function messageList() {
    return room.messages.map((message: Messages, index: number) => (
      <ChatBubble key={index} message={message} currentUser={user.username} />
    ));
  }
  return (
    <div className={styles.chatMain}>
      <div className={styles.chatMessages}>
        {messageList()}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.compose}>
        <MessageInput roomUid={room.uid} loading={false} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default memo(ChatRoomPage);