import React from 'react';
import { FaEnvelope } from "react-icons/fa";
import classNames from 'classnames/bind';
import { Input } from 'reactstrap';
const styles = require('./styles.module.scss');
const cx = classNames.bind(styles);

interface Props {
  value: string;
  rounded: boolean;
  onChange?: any;
  placeholder?: string;
  id?: string;
}

const MessageInput = ({ value, placeholder, id, onChange, rounded }: Props) => {
  const inputClass = cx({
    formRounded: rounded,
  });
  return (
    <>
      <span>{FaEnvelope}</span>
      <Input className={inputClass} onChange={onChange} value={value} placeholder={placeholder} id={id} />
    </>
  );
};

export default MessageInput;
