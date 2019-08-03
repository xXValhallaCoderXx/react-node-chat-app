import React from 'react';
import { Button, Spinner } from 'reactstrap';

interface Props {
  id?: string;
  loading?: boolean;
  style?: object;
  children?: string;
  className?: string;
  onClick?: (event: any) => void;
}

const BtnSpinner = (props: Props) => {
  const { id, onClick, loading, style, className, children } = props;
  return (
    <Button style={style} className={className} onClick={onClick} id={id}>
      {loading ? <Spinner id={`btn-spinner-${id}`} size="sm" /> : children}
    </Button>
  );
};

export default BtnSpinner;
