import React from 'react';
import classNames from 'classnames/bind';
import { Button as RsButton, Spinner, ButtonProps } from 'reactstrap';
const styles = require('./styles.module.scss');
const cx = classNames.bind(styles);

interface CustomProps {
  rounded?: boolean;
  loading?: boolean;
}

type Props = ButtonProps & CustomProps;

const Button = (props: Props) => {
  const { loading, rounded, children } = props;
  const btnClass = cx({
    btnRounded: rounded,
  });

  return (
    <RsButton className={btnClass} {...props}>
      {loading ? <Spinner /> : children}
    </RsButton>
  );
};

export default Button;
