import React from 'react';
import { authServices } from 'chat-client/services';
import { useForm, useApi } from 'chat-client/shared/hooks';
import Form from './form';

interface Props {
  initUser: any;
}

export interface FormValues {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface ApiState {
  loading: boolean;
  data: any;
  error: {
    data: string;
  };
}

function validate(values) {
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
    errors.confirmPassword = 'Warrior! We must know your name for the battle field!';
  }
  return errors;
}

const FormController = ({ initUser }: Props) => {
  const { values, errors, handleSubmit, handleChange } = useForm(onSubmit, validate);
  const [apiState, callApi]: any = useApi(authServices.registerApi);

  async function onSubmit() {
    const { email, password } = values;
    const response = await callApi({ email, password });
    console.log('DO STUFF');
  }
  return <Form onChange={handleChange} apiState={apiState} values={values} errors={errors} onSubmit={handleSubmit} />;
};

export default FormController;
