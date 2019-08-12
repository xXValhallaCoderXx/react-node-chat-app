import React, { ReactNode } from 'react';
import { Card, Col, Row } from 'reactstrap';

interface Props {
  author: string;
  createdAt: string;
  message: string;
  uid: string;
}

const ChatBubble = ({ author, createdAt, message, uid }: Props) => {
  console.log("UID: ", uid);
  return (
    <div key={uid} className="p-0 mb-3" style={{maxWidth: 450}}>
      <Card className="p-2" style={{ borderRadius: 8 }}>
        <Row className="ml-1">
          {author} - {createdAt}
        </Row>
        <Row className="ml-1">{message}</Row>
      </Card>
    </div>
  );
};

export default ChatBubble;
