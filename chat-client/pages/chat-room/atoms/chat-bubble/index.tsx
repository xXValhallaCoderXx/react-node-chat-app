import React from 'react';
import { Card, Row } from 'reactstrap';
import { Messages } from 'chat-client/shared/types';
import classNames from 'classnames/bind';
const styles = require('./styles.module.scss');
const cx = classNames.bind(styles);

interface Props {
  message: Messages;
  currentUser: string;
}

const chatBubbleClass = cx({
  chatBubble: true,
  'p-2': true,
});

const ChatBubble = ({ message, currentUser }: Props) => {
  const { author, createdAt, message: text, uid } = message;
  const chatBubbleWrapper = cx({
    'p-0': true,
    'mb-3': true,
    'd-flex': true,
    'justify-content-end': currentUser !== author
  });
  return (
    <div key={uid} className={chatBubbleWrapper}>
      <Card className={chatBubbleClass}>
        <Row className="ml-1">
          {author} - {createdAt}
        </Row>
        <Row className="ml-1">{text}</Row>
      </Card>
    </div>
  );
};

export default ChatBubble;
