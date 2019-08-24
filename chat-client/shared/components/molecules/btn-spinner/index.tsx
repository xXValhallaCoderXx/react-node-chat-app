import React from 'react';
import { Button, Spinner } from 'reactstrap';

interface Props {
  id?: string;
  loading?: boolean;
  style?: object;
  color?: string;
  children?: string;
  className?: string;
  block?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: any) => void;
}

const BtnSpinner = (props: Props) => {
  const { id, onClick, loading, style, className, children, block, type, color } = props;

  return (
    <Button
      color={color}
      block={block}
      type={type || 'button'}
      style={style}
      className={className}
      onClick={onClick}
      id={id}
    >
      {loading ? <Spinner id={`btn-spinner-${id}`} size="sm" /> : children}
    </Button>
  );
};

export default BtnSpinner;