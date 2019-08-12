import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { MessageInput } from 'chat-client/pages/chat-room/molecules';

export interface FormValues {
  message?: string;
}

interface Props {
  sendMessage: any;
  loading: boolean;
}

function validate(values: FormValues) {
  const errors: FormValues = {};
  if (!values.message) {
    errors.message = 'Message is required';
  }
  return errors;
}

class FormController extends Component<Props, {}> {
  state = { value: { message: '' } };

  onChange = (e: any) => {
    this.setState({ value: { message: e.target.value } });
  };

  onSubmit = (event: any) => {
    event.preventDefault();
    const errors = validate(this.state.value);
    this.setState({ errors });
    if (isEmpty(errors)) {
      const { message } = this.state.value;
    }
  };
  render() {
    const { loading } = this.props;
    const { message } = this.state.value;
    return <MessageInput loading={loading} value={message} onSubmit={this.onSubmit} onChange={this.onChange} />;
  }
}

export default FormController;
