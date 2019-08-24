import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
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
  status: any;
  onSubmit: any;
}

function validate(values: FormValues) {
  const errors: FormValues = {};
  if (!values.email) {
    errors.email = 'Warrior! We must know your name for the battle field!';
  }
  if (!values.password) {
    errors.password = 'You must provide this, for passage!';
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
      this.props.onSubmit({ isOnline: true, email, password });
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
