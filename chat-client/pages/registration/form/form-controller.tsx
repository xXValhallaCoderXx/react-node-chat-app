import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import Form from './form-view';

interface State {
  values: FormValues;
  errors: FormValues;
}

interface Props {
  status: any;
  submitRegistration: any;
}

export interface FormValues {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function validate(values: FormValues) {
  const errors: any = {};
  if (!values.username) {
    errors.username = 'Warrior! We must know your name for the battle field!';
  }
  if (!values.email) {
    errors.email = 'You must provide this, for passage!';
  }
  if (!values.password) {
    errors.password = 'You must provide this, for passage!';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'You must provide this, for passage!';
  }
  return errors;
}

export default class FormController extends Component<Props, State> {
  state = {
    values: {
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
    },
    errors: {},
  };

  onSubmit = (event: any) => {
    event.preventDefault();
    const result = validate(this.state.values);
    this.setState({ errors: result });
    if (isEmpty(result)) {
      const { email, username, password } = this.state.values;
      this.props.submitRegistration({ email, password, username });
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
