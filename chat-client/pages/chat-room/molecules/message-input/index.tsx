import React from 'react';
import { Row, Col } from 'reactstrap';
import { Button, Input } from 'chat-client/shared/components/atoms';

interface Props {
  onSubmit: any;
  onChange: any;
  value: string;
  loading: boolean;
}

const MessageInput = ({ onChange, onSubmit, value, loading }: Props) => {
  return (
    <form onSubmit={onSubmit} style={{width: "100%"}}>
      <Row>
        <Col sm="9" md="9" lg="10" xl="11">
          <Input placeholder="Enter message..." value={value} onChange={onChange} />
        </Col>
        <Col sm="3" md="3" lg="2" xl="1">
          <Button loading={loading} block type="submit" onClick={onSubmit}>
            SEND
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default MessageInput;
