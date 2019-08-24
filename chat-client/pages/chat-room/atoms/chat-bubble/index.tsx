import React from 'react';
import capitalize from "lodash/capitalize";
import { Card, Row } from 'reactstrap';
import { Messages } from 'chat-client/shared/types';
import classNames from 'classnames/bind';
const styles = require('./styles.module.scss');
const cx = classNames.bind(styles);

interface Props {
  message: Messages;
  currentUser: string;
}

const ChatBubble = ({ message, currentUser }: Props) => {
  const { author, createdAt, message: text, uid } = message;
  const chatBubbleWrapper = cx({
    'p-0': true,
    'mb-3': true,
    'd-flex': true,
    'justify-content-end': currentUser !== author,
  });

  const chatBubbleClass = cx({
    chatBubbleBG: currentUser !== author,
    chatBubble: true,
    'p-2': true,
  });
  return (
    <div key={uid} className={chatBubbleWrapper}>
      <Card className={chatBubbleClass}>
        <div className="d-flex align-items-center">
          <p className="font-weight-bold mb-0">{capitalize(author)}</p>{' '}
          <p className="text-muted mb-0" style={{ fontSize: 12 }}>
            - {createdAt}
          </p>
        </div>
        <Row className="ml-1">{text}</Row>
      </Card>
    </div>
  );
};

export default ChatBubble;
