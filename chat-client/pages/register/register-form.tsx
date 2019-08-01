import React from 'react';
import { useForm } from 'chat-client/shared/hooks';
import {Form, FormGroup, Label, Input, FormText, FormFeedback, Button} from "reactstrap";

interface Props {
  onSubmit: any;
  error: string;
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

const RegisterForm = ({onSubmit, error}: Props) => {
  const { values, errors, handleSubmit, handleChange } = useForm(onSubmit, validate);
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Username</Label>
        <Input
          invalid={errors.username ? true : false}
          type="text"
          name="username"
          placeholder="What do you hail as warrior?"
          value={values.username || ''}
          onChange={handleChange}
        />
        <FormText>This is how others will see you</FormText>
        <FormFeedback>{errors.username}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input
          invalid={errors.email ? true : false}
          type="text"
          name="email"
          placeholder="Enter your email..."
          value={values.email || ''}
          onChange={handleChange}
        />
        <FormFeedback>{errors.password}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input
          invalid={errors.password ? true : false}
          type="text"
          name="password"
          placeholder="Speak friend, and enter..."
          value={values.password || ''}
          onChange={handleChange}
        />
        <FormFeedback>{errors.password}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Confirm Password</Label>
        <Input
          invalid={errors.confirmPassword ? true : false}
          type="text"
          name="confirmPassword"
          placeholder="Speak friend, and enter..."
          value={values.confirmPassword || ''}
          onChange={handleChange}
        />
        <FormFeedback>{errors.confirmPassword}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Button block color="brand-secondary" type="submit">
          {/* {state.loading ? <Spinner size="sm" /> : 'SIGN UP'} */}
        </Button>
      </FormGroup>
      {error && <p className="text-center text-danger">{error}</p>}
    </Form>
  );
};

export default RegisterForm;
