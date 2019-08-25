import React from 'react';
import classNames from 'classnames/bind';
import { Input, InputProps } from 'reactstrap';
const styles = require('./styles.module.scss');
const cx = classNames.bind(styles);

interface CustomProps {
  rounded?: boolean;
}

type Props = InputProps & CustomProps;

const MessageInput = (props: Props) => {
  const { rounded } = props;
  const inputClass = cx({
    formRounded: rounded,
  });
  return <Input {...props} className={inputClass} {...props} />;
};

export default MessageInput;
