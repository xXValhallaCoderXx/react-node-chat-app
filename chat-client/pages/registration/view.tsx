import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Card } from 'reactstrap';
import {InitUser} from "./index";
import RegisterForm from './form';

// const imageSrc = require('chat-client/shared/images/viking-icon.png');

interface Props {
  initUser: (params: InitUser) => void;
}

const RegisterView = ({ initUser }: Props) => {
  return (
    <div className="d-flex h-100 justify-content-center align-items-center">
      <Card className="p-5" style={{ width: 500 }}>
        {/* <img className="mx-auto" src={imageSrc} height="60" width="55" /> */}
        <h3 className="text-center mt-2 mb-2">Valhalla Chat</h3>
        <p className="text-center font-weight-bold">Join us and be part of the shield wall!</p>
        <RegisterForm initUser={initUser} />
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
