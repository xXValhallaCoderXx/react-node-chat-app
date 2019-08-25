import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Card } from 'reactstrap';
import RegisterForm from './form';
import { SubmitRegistration, Status } from './index';

interface Props {
  onSubmit: ({email, username, password}: SubmitRegistration) => void;
  status: Status;
}

const imageSrc = require('chat-client/shared/images/viking-icon.png');

const RegisterView = ({ onSubmit, status }: Props) => {
  return (
    <div style={{overflowY: "auto"}} className="d-flex h-100 justify-content-center align-items-center p-3">
      <Card className="p-5">
        <img className="mx-auto" src={imageSrc} height="60" width="55" />
        <h3 className="text-center mt-2 mb-2">Valhalla Chat</h3>
        <p className="text-center font-weight-bold">Join us and be part of the shield wall!</p>
        <RegisterForm onSubmit={onSubmit} status={status} />
        <Row className="justify-content-center font-italic">
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
