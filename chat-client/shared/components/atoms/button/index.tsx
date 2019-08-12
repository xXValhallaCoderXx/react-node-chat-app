import React, { ReactNode } from 'react';
import { Button, Spinner } from 'reactstrap';

interface Props {
  type: 'button' | 'submit' | 'reset' | undefined;
  block?: boolean;
  children?: ReactNode;
  onClick: any;
  loading?: boolean;
}

const ButtonSpinner = ({ children, onClick, type, block, loading }: Props) => {
  return (
    <Button block={block} type={type} onClick={onClick}>
      {loading ? <Spinner /> : children}
    </Button>
  );
};

export default ButtonSpinner;
