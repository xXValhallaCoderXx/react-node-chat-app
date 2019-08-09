import React, { memo } from 'react';
import { Form, FormGroup, Input, FormFeedback, Label } from 'reactstrap';
import { BtnSpinner } from 'chat-client/shared/components';
import { FormValues, ApiState } from './index';

interface Props {
  values: FormValues;
  onSubmit: any;
  onChange: any;
}

const LoginForm = ({ onChange, values, onSubmit }: Props) => {
  return (
    <Form id="login-form" onSubmit={onSubmit}>
      <FormGroup>
        <Label className="font-weight-bold">Email</Label>
        <Input
          invalid={values.email ? true : false}
          type="email"
          id="email"
          placeholder="What do you hail as warrior?"
          value={values.email || ''}
          onChange={onChange}
        />
        <FormFeedback id="email-error">{values.email}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label className="font-weight-bold">Password</Label>
        <Input
          invalid={values.password ? true : false}
          type="password"
          id="password"
          placeholder="Speak friend, and enter..."
          value={values.password || ''}
          onChange={onChange}
        />
        <FormFeedback>{values.password}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <BtnSpinner block color="brand-secondary" id="login-submit" type="submit">
          ENTER
        </BtnSpinner>
      </FormGroup>
    </Form>
  );
};

export default memo(LoginForm);
