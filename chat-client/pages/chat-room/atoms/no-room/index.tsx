import React from 'react';
import { Card } from 'reactstrap';

interface Props {
  message: string;
}

const imageSrc = require('chat-client/shared/images/viking-icon.png');

const NoRoomFound = ({ message }: Props) => {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Card className="p-3">
        <img className="mx-auto" src={imageSrc} height="60" width="55" />
        <h3 className="mt-3 text-center">Oh No!</h3>
        <h5 className="mt-2">{message}</h5>
      </Card>
    </div>
  );
};

export default NoRoomFound;
