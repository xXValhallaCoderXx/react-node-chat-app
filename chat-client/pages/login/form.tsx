import React, {memo} from 'react';
import {authServices} from "chat-client/services";
import { Form, FormGroup, Input, FormFeedback, Label } from 'reactstrap';
import { BtnSpinner } from 'chat-client/shared/components';
import { useForm, useApi } from 'chat-client/shared/hooks';

interface Props {
  initUser: any;
}

interface Values {
  email?: string;
  password?: string;
}

function validate(values: Values) {
  const errors: Values = {};
  if (!values.email) {
    errors.email = 'Warrior! We must know your name for the battle field!';
  }
  if (!values.password) {
    errors.password = 'You must provide this, for passage!';
  }
  return errors;
}

const AuthForm = ({ initUser }: Props) => {
  const { values, errors, handleSubmit, handleChange } = useForm(onSubmit, validate);
  const [{loading, data, error}, callApi]: any = useApi(authServices.loginApi);
  return (
    <Form id="login-form" onSubmit={handleSubmit}>
      <FormGroup>
        <Label className="font-weight-bold">Email</Label>
        <Input
          invalid={errors.email ? true : false}
          type="email"
          id="email"
          placeholder="What do you hail as warrior?"
          value={values.email || ''}
          onChange={handleChange}
        />
        <FormFeedback id="email-error">{errors.email}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label className="font-weight-bold">Password</Label>
        <Input
          invalid={errors.password ? true : false}
          type="password"
          id="password"
          placeholder="Speak friend, and enter..."
          value={values.password || ''}
          onChange={handleChange}
        />
        <FormFeedback>{errors.password}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <BtnSpinner loading={loading} block color="brand-secondary" id="login-submit" type="submit">
          ENTER
        </BtnSpinner>
      </FormGroup>
      {error && (
        <p id="login-server-error" className="text-center text-danger">
          {error.data}
        </p>
      )}
    </Form>
  );

  async function onSubmit() {
    const {email, password} = values;
    await callApi({email, password});
    console.log("DATA: ", data);
  }
};

export default memo(AuthForm);
