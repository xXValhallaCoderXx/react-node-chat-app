import React, { memo } from 'react';
import { Form, FormGroup, Input, FormFeedback, Label } from 'reactstrap';
import { BtnSpinner } from 'chat-client/shared/components';
import {FormValues, ApiState} from "./index";

interface Props {
  values: FormValues;
  errors: FormValues;
  validateOn: any;
  onChange: any;
  apiState: ApiState;
}

const LoginForm = ({ onChange, validateOn, values, errors, apiState }: Props) => {
  const {loading, error} = apiState;
  return (
    <Form id="login-form" onSubmit={validateOn}>
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
        <FormFeedback>{errors.password}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <BtnSpinner loading={loading} block color="brand-secondary" id="login-submit" type="submit">
          ENTER
        </BtnSpinner>
      </FormGroup>
      {error && (
        <p id="login-server-error" className="text-center text-danger">
          {error}
        </p>
      )}
    </Form>
  );
};

export default memo(LoginForm);
