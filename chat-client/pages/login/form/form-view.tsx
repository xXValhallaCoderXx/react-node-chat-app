import React, { memo } from 'react';
import { Form, FormGroup, Input, FormFeedback, Label } from 'reactstrap';
import { BtnSpinner, Input as Input2 } from 'chat-client/shared/components';
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
        <Label className="font-weight-bold">Email</Label>
        <Input
          invalid={errors.email ? true : false}
          type="email"
          id="email"
          placeholder="What do you hail as warrior?"
          value={values.email || ''}
          onChange={onChange}
        />
        <Input2 />
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
          onChange={onChange}
        />
        <FormFeedback id="password-error">{errors.password}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <BtnSpinner loading={status.loading} block color="brand-secondary" id="login-submit" type="submit">
          ENTER
        </BtnSpinner>
      </FormGroup>
      {status.error && <p className="text-danger text-center">{status.data.message}</p>}
    </Form>
  );
};

export default memo(LoginForm);
