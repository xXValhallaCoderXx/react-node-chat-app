import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'reactstrap';
import LoginForm from './login-form';

const imageSrc = require('chat-client/shared/images/viking-icon.png');

interface Props {
  error: string;
  onSubmit: ({email, password}) => void;
}

const LoginView = ({ error, onSubmit }: Props) => {
  return (
    <div className="d-flex h-100 justify-content-center align-items-center">
      <Card className="p-5">
        <img className="mx-auto" src={imageSrc} height="60" width="55" />
        <h3 className="text-center mt-2 mb-2">Valhalla Chat</h3>
        <Row style={{ width: 500 }}>
          <Col>
            <p className="text-center font-weight-bold">Login and start raiding!</p>
            <LoginForm error={error} onSubmit={onSubmit} />
          </Col>
        </Row>
        <Row className="justify-content-center">
          Not part of the shield wall?
          <Link to="/register" className="ml-1 text-brand-primary font-weight-bold">
            Join our ranks!
          </Link>
        </Row>
      </Card>
    </div>
  );
};
export default LoginView;