import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { OnSubmit, Status } from '../index';
import Form from './form-view';

export interface FormValues {
  email?: string;
  password?: string;
}

interface State {
  values: FormValues;
  errors: FormValues;
}

interface Props {
  status: Status;
  onSubmit: ({ email, password }: OnSubmit) => void;
}

function validate(values: FormValues) {
  const errors: FormValues = {};
  if (!values.email) {
    errors.email = 'Your email is required, for passage!';
  }
  if (!values.password) {
    errors.password = 'Your password is required, for passage!';
  }
  return errors;
}

export default class FormController extends Component<Props, State> {
  state = {
    values: {
      email: '',
      password: '',
    },
    errors: {},
  };

  onSubmit = (event: any) => {
    event.preventDefault();
    const errors = validate(this.state.values);
    this.setState({ errors });
    if (isEmpty(errors)) {
      const { email, password } = this.state.values;
      this.props.onSubmit({ email, password });
    }
  };

  onChange = (event: any) => {
    const { id, value } = event.target;
    this.setState({
      errors: { ...this.state.errors, [id]: '' },
      values: { ...this.state.values, [id]: value },
    });
  };
  render() {
    const { values, errors } = this.state;
    const { status } = this.props;
    return <Form status={status} onChange={this.onChange} values={values} onSubmit={this.onSubmit} errors={errors} />;
  }
}
