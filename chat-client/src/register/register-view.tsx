import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'reactstrap';
import RegisterForm from './register-form';

const imageSrc = require('chat-client/shared/images/viking-icon.png');

interface Props {
  error: string;
  loading: boolean;
  onSubmit: ({ email, password, username }) => void;
}

const RegisterView = ({ error, onSubmit, loading }: Props) => {
  return (
    <div className="d-flex h-100 justify-content-center align-items-center">
      <Card className="p-5" style={{width: 500}}>
        <img className="mx-auto" src={imageSrc} height="60" width="55" />
        <h3 className="text-center mt-2 mb-2">Valhalla Chat</h3>
        <p className="text-center font-weight-bold">Join us and be part of the shield wall!</p>
        <RegisterForm loading={loading} error={error} onSubmit={onSubmit}  />
        <Row className="justify-content-center">
          Already part of our army?
          <Link to="/" className="ml-1 text-brand-primary font-weight-bold">
            Login in!
          </Link>
        </Row>
      </Card>
    </div>
  );
};
export default RegisterView;
