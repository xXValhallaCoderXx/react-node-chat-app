import React, {useEffect} from 'react';
import { authServices } from 'chat-client/services';
import { useForm, useCallApi } from 'chat-client/shared/hooks';
import { InitUser } from '../index';
import Form from './form';

interface Props {
  initUser: (params: InitUser) => void;
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
  error: string;
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
  const { values, errors, validateOn, handleChange } = useForm({ onSubmit, validate });
  const { state, useApi } = useCallApi({ callApi: authServices.registerApi });

  useEffect(() => {
    if(state.success && state.data){
      const {email, token, username, online} = state.data.data;
      initUser({email, token, username, isOnline: true})
    }
  }, [state])

  async function onSubmit() {
    const { email, password, username } = values;
    await useApi({ email, password, username });
  }
  return <Form onChange={handleChange} apiState={state} values={values} errors={errors} onSubmit={validateOn} />;
};

export default FormController;