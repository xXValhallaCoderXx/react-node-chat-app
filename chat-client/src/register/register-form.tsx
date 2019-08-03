import React from 'react';
import { useForm } from 'chat-client/shared/hooks';
import { BtnSpinner } from 'chat-client/shared/components';
import { Form, FormGroup, Label, Input, FormText, FormFeedback, Spinner } from 'reactstrap';

interface Props {
  onSubmit: any;
  error: string;
  loading: boolean;
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

const RegisterForm = ({ onSubmit, error, loading }: Props) => {
  const { values, errors, handleSubmit, handleChange } = useForm(onSubmit, validate);
  return (
    <Form onSubmit={handleSubmit}>
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
        <FormFeedback>{errors.username}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label className="font-weight-bold">Email</Label>
        <Input
          invalid={errors.email ? true : false}
          type="text"
          id="email"
          placeholder="Enter your email..."
          value={values.email || ''}
          onChange={handleChange}
        />
        <FormFeedback>{errors.password}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label className="font-weight-bold">Password</Label>
        <Input
          invalid={errors.password ? true : false}
          type="text"
          id="password"
          placeholder="Speak friend, and enter..."
          value={values.password || ''}
          onChange={handleChange}
        />
        <FormFeedback>{errors.password}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label className="font-weight-bold">Confirm Password</Label>
        <Input
          invalid={errors.confirmPassword ? true : false}
          type="text"
          id="confirmPassword"
          placeholder="Speak friend, and enter..."
          value={values.confirmPassword || ''}
          onChange={handleChange}
        />
        <FormFeedback>{errors.confirmPassword}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <BtnSpinner block color="brand-secondary" type="submit">
          SIGN UP
        </BtnSpinner>
      </FormGroup>
      {error && <p className="text-center text-danger">{error}</p>}
    </Form>
  );
};

export default RegisterForm;
