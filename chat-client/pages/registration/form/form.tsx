import React from 'react';
import { BtnSpinner } from 'chat-client/shared/components';
import { Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import { FormValues, ApiState } from './index';

interface Props {
  values: FormValues;
  errors: FormValues;
  onSubmit: any;
  onChange: any;
  apiState: ApiState;
}

const RegisterForm = ({ onChange, onSubmit, values, errors, apiState }: Props) => {
  const {loading, error} = apiState;
  console.debug("VALUES: ", values);
  return (
    <Form id="register-form" onSubmit={onSubmit}>
      <FormGroup>
        <Label className="font-weight-bold">Username</Label>
        <Input
          invalid={errors.username ? true : false}
          type="text"
          id="username"
          placeholder="What do you hail as warrior?"
          value={values.username || ''}
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
};

export default RegisterForm;
