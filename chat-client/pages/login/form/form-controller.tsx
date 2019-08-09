import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { FormValues } from './index';
import Form from './form-view';

interface State {
  values: FormValues;
  errors: FormValues;
}

interface Props {
  status: any;
  loginApi: any;
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
    const result = validate(this.state.values);
    this.setState({ errors: result });
    if (isEmpty(result)) {
      this.props.loginApi({ isOnline: true, email: '', token: '', username: '' });
    }
  };

  onChange = (event: any) => {
    const { id, value } = event.target;
    this.setState({
      errors: {
        ...this.state.errors,
        [id]: '',
      },
      values: {
        ...this.state.values,
        [id]: value,
      },
    });
  };
  render() {
    const { values, errors } = this.state;
    const { status } = this.props;
    return <Form status={status} onChange={this.onChange} values={values} onSubmit={this.onSubmit} errors={errors} />;
  }
}
