import React, { memo } from 'react';
import { Form, FormGroup, FormFeedback } from 'reactstrap';
import { Button, Input } from 'chat-client/shared/components';
import { FormValues } from './index';

interface Props {
  status: any;
  values: FormValues;
  errors: FormValues;
  onSubmit: any;
  onChange: any;
}

const LoginForm = ({ onChange, values, errors, onSubmit, status }: Props) => {
  return (
    <Form id="login-form" onSubmit={onSubmit}>
      <FormGroup>
        <Input
          invalid={errors.email ? true : false}
          type="email"
          id="email"
          placeholder="Email"
          value={values.email || ''}
          onChange={onChange}
          rounded
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
        <Button rounded loading={status.loading} block color="brand-secondary" id="login-submit" type="submit">
          ENTER
        </Button>
      </FormGroup>
      {status.error && <p className="text-danger text-center">{status.data.message}</p>}
    </Form>
  );
};

export default memo(LoginForm);
