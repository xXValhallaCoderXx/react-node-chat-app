import React from 'react';
import { shallow } from 'enzyme';
import Form from "chat-client/pages/login/form/form-view";

const emptyProps = {
  email: '',
  password: '',
};

const status = {};

describe('Login Form Without Props', () => {
  const wrapper = shallow(
    <Form status={status} values={emptyProps} errors={emptyProps} onChange={jest.fn} onSubmit={jest.fn} />,
  );

  it('should have an email field', () => {
    expect(wrapper.find('#email').length).toEqual(1);
  });

  it('should have a password field', () => {
    expect(wrapper.find('#password').length).toEqual(1);
  });

  it('should have proper props for email field', () => {
    expect(wrapper.find('#email').props()).toEqual({
      id: 'email',
      invalid: false,
      value: '',
      onChange: expect.any(Function),
      placeholder: 'What do you hail as warrior?',
      type: 'email',
    });
  });

  it('should have proper props for password field', () => {
    expect(wrapper.find('#password').props()).toEqual({
      id: 'password',
      invalid: false,
      value: '',
      onChange: expect.any(Function),
      placeholder: 'Speak friend, and enter...',
      type: 'password',
    });
  });

  it('should have error feedback elements but not rendered', () => {
    const emailError = wrapper.find('#email-error');
    const passwordError = wrapper.find('#password-error');

    expect(emailError.length).toEqual(1);
    expect(passwordError.length).toEqual(1);
  });
});

const values = {
  email: 'nate@gmail.com',
  password: '123456',
};

const errors = {
  email: 'Email Error',
  password: 'Password Error',
};

describe('Login Form With Props', () => {
  const wrapper = shallow(
    <Form status={status} values={values} errors={errors} onChange={jest.fn} onSubmit={jest.fn} />,
  );

  it('should have values in email field', () => {
    expect(wrapper.find('#email').props().value).toEqual('nate@gmail.com');
  });

  it('should have values in password field', () => {
    expect(wrapper.find('#password').props().value).toEqual('123456');
  });

  it('should have error values', () => {
    expect(wrapper.find('#email-error').contains('Email Error'));
    expect(wrapper.find('#password-error').contains('Password Error'));
  });
});
