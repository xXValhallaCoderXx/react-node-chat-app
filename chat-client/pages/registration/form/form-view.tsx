import React from 'react';
import {Status} from "../index";
import { Button, Input } from 'chat-client/shared/components';
import { Form, FormGroup, Label, FormText, FormFeedback } from 'reactstrap';
import { FormValues } from './index';

interface Props {
  status: Status;
  values: FormValues;
  errors: FormValues;
  onSubmit: any;
  onChange: any;
}

const RegisterForm = ({ onChange, onSubmit, values, errors, status }: Props) => {
  return (
    <Form id="register-form" onSubmit={onSubmit}>
      <FormGroup>
        <Input
          rounded
          invalid={errors.username ? true : false}
          type="text"
          id="username"
          placeholder="Username"
          value={values.username || ''}
          onChange={onChange}
        />
        <FormFeedback id="username-error">{errors.username}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Input
          rounded
          invalid={errors.email ? true : false}
          type="email"
          id="email"
          placeholder="Email"
          value={values.email || ''}
          onChange={onChange}
        />
        <FormFeedback id="email-error">{errors.email}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Input
          rounded
          invalid={errors.password ? true : false}
          type="password"
          id="password"
          placeholder="Password"
          value={values.password || ''}
          onChange={onChange}
        />
        <FormFeedback id="password-error">{errors.password}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Input
          rounded
          invalid={errors.confirmPassword ? true : false}
          type="password"
          id="confirmPassword"
          placeholder="Confirm password"
          value={values.confirmPassword || ''}
          onChange={onChange}
        />
        <FormFeedback id="confirmPassword-error">{errors.confirmPassword}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Button rounded loading={status.loading} block color="brand-secondary" type="submit">
          SIGN UP
        </Button>
      </FormGroup>
      {status.error && <p className="text-danger text-center">{status.data.message}</p>}
    </Form>
  );
};

export default RegisterForm;
