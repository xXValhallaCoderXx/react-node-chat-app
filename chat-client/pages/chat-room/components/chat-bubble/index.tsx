import React, { ReactNode } from 'react';
import { Card, Col, Row } from 'reactstrap';

interface Props {
  author: string;
  createdAt: string;
  children: ReactNode;
}

const ChatBubble = ({ author, createdAt, children }: Props) => {
  return (
    <Col className="p-0 mb-3" md="5">
      <Card className="p-2" style={{ borderRadius: 8 }}>
        <Row className="ml-1">
          {author} - {createdAt}
        </Row>
        <Row className="ml-1">{children}</Row>
      </Card>
    </Col>
  );
};

export default ChatBubble;
