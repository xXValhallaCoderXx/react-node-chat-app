import React, { useEffect } from 'react';
import { authServices } from 'chat-client/services';
import { useForm, useCallApi } from 'chat-client/shared/hooks';
import { InitUser } from '../index';
import Form from './form';

interface Props {
  initUser: (params: InitUser) => void;
}

export interface FormValues {
  email?: string;
  password?: string;
}

export interface ApiState {
  loading: boolean;
  data: any;
  error: any;
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
  const { state, useApi } = useCallApi({ callApi: authServices.loginApi });

  useEffect(() => {
    if (state.success && state.data) {
      const { email, token, username, online } = state.data.data.user;
      initUser({ email, token, username, isOnline: true });
    }
  }, [state]);

  async function onSubmit() {
    const { email, password } = values;
    await useApi({ email, password });
  }
  return <Form onChange={handleChange} apiState={state} values={values} errors={errors} validateOn={validateOn} />;
};

export default FormController;
