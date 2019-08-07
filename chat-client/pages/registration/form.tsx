import React from 'react';
import {authServices} from "chat-client/services";
import { useForm, useApi } from 'chat-client/shared/hooks';
import { BtnSpinner } from 'chat-client/shared/components';
import { Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';

interface Props {
  initUser: any;
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

const RegisterForm = ({ initUser }: Props) => {
  const { values, errors, handleSubmit, handleChange } = useForm(onSubmit, validate);
  const [{loading, data, error}, callApi]: any = useApi(authServices.registerApi);
  return (
    <Form id="register-form" onSubmit={handleSubmit}>
      <FormGroup>
        <Label className="font-weight-bold">Username</Label>
        <Input
          invalid={errors.username ? true : false}
          type="text"
          id="username"
          placeholder="What do you hail as warrior?"
          value={values.username || ''}
          onChange={handleChange}
        />
        <FormText>This is how others will see you</FormText>
        <FormFeedback id="errors-username">{errors.username}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label className="font-weight-bold">Email</Label>
        <Input
          invalid={errors.email ? true : false}
          type="email"
          id="email"
          placeholder="Enter your email..."
          value={values.email || ''}
          onChange={handleChange}
        />
        <FormFeedback id="errors-email">{errors.password}</FormFeedback>
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
        <FormFeedback id="errors-password">{errors.password}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label className="font-weight-bold">Confirm Password</Label>
        <Input
          invalid={errors.confirmPassword ? true : false}
          type="password"
          id="confirmPassword"
          placeholder="Speak friend, and enter..."
          value={values.confirmPassword || ''}
          onChange={handleChange}
        />
        <FormFeedback id="errors-confirmPassword">{errors.confirmPassword}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <BtnSpinner loading={loading} block color="brand-secondary" type="submit">
          SIGN UP
        </BtnSpinner>
      </FormGroup>
      {error && (
        <p id="register-server-error" className="text-center text-danger">
          {error}
        </p>
      )}
    </Form>
  );
  async function onSubmit() {
    const { email, password } = values;
    await callApi({ email, password });
    console.log('DATA: ', data);
  }
};

export default RegisterForm;
