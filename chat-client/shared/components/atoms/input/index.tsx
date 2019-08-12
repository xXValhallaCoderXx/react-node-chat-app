import React, { Component } from 'react';
import { Input } from 'reactstrap';

interface Props {
  value: string;
  onChange?: any;
  placeholder?: string;
  id?: string;
}

const MessageInput = ({ value, placeholder, id, onChange }: Props) => (
  <Input onChange={onChange} value={value} placeholder={placeholder} id={id} />
);

export default MessageInput;
