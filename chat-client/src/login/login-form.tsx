import React from 'react';
import { Button, Form, FormGroup, Input, FormFeedback, Label } from 'reactstrap';
import { useForm } from 'chat-client/shared/hooks';

interface Props {
  onSubmit: ({email, password}) => void;
  error: string;
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

const AuthForm = ({ onSubmit, error }: Props) => {
  const { values, errors, handleSubmit, handleChange } = useForm(onSubmit, validate);
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
        <Button block color="brand-secondary" id="login-submit" type="submit">
          ENTER
        </Button>
      </FormGroup>
      {error && <p id="login-server-error" className="text-center text-danger">{error}</p>}
    </Form>
  );
};

export default AuthForm;
