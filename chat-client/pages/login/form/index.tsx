import React from 'react';
import { authServices } from 'chat-client/services';
import { useForm, useApi } from 'chat-client/shared/hooks';

import Form from './form';

interface Props {
  initUser: any;
}

export interface FormValues {
  email?: string;
  password?: string;
}

export interface ApiState {
  loading: boolean;
  data: any;
  error: {
    data: string;
  };
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

const FormController = ({ initUser }: Props) => {
  const { values, errors, handleChange, validateOn } = useForm({ validate, onSubmit });
  const [apiState, callApi]: any = useApi(authServices.loginApi);

  async function onSubmit() {
    const { email, password } = values;
    const response = await callApi({ email, password });
    console.log('DO STUFF');
  }
  return <Form onChange={handleChange} apiState={apiState} values={values} errors={errors} validateOn={validateOn} />;
};

export default FormController;
