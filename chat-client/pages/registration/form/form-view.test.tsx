import React from 'react';
import { shallow } from 'enzyme';
import Form from './form-view';

const emptyProps = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const status = {};

describe('Register Form Without Props', () => {
  const wrapper = shallow(
    <Form status={status} values={emptyProps} errors={emptyProps} onChange={jest.fn} onSubmit={jest.fn} />,
  );

  it('should have an username field', () => {
    expect(wrapper.find('#username').length).toEqual(1);
  });

  it('should have an email field', () => {
    expect(wrapper.find('#email').length).toEqual(1);
  });

  it('should have a password field', () => {
    expect(wrapper.find('#password').length).toEqual(1);
  });

  it('should have a confirm password field', () => {
    expect(wrapper.find('#confirmPassword').length).toEqual(1);
  });

  it('should have proper props for username field', () => {
    expect(wrapper.find('#username').props()).toEqual({
      id: 'username',
      invalid: false,
      value: '',
      onChange: expect.any(Function),
      placeholder: 'What do you hail as warrior?',
      type: 'text',
    });
  });

  it('should have proper props for email field', () => {
    expect(wrapper.find('#email').props()).toEqual({
      id: 'email',
      invalid: false,
      value: '',
      onChange: expect.any(Function),
      placeholder: 'Enter your email...',
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

  it('should have proper props for confirm password field', () => {
    expect(wrapper.find('#confirmPassword').props()).toEqual({
      id: 'confirmPassword',
      invalid: false,
      value: '',
      onChange: expect.any(Function),
      placeholder: 'Speak friend, and enter...',
      type: 'password',
    });
  });

  it('should have error feedback elements but not rendered', () => {
    const usernameError = wrapper.find('#username-error');
    const emailError = wrapper.find('#email-error');
    const passwordError = wrapper.find('#password-error');
    const confirmPasswordError = wrapper.find('#confirmPassword-error');

    expect(usernameError.length).toEqual(1);
    expect(emailError.length).toEqual(1);
    expect(passwordError.length).toEqual(1);
    expect(confirmPasswordError.length).toEqual(1);
  });
});

const values = {
  username: 'Hulk',
  email: 'nate@gmail.com',
  password: '123456',
  confirmPassword: '123',
};

const errors = {
  username: 'Username Error',
  email: 'Email Error',
  password: 'Password Error',
  confirmPassword: 'Confirm Password Error'
};

describe('Register Form With Props', () => {
  const wrapper = shallow(
    <Form status={status} values={values} errors={errors} onChange={jest.fn} onSubmit={jest.fn} />,
  );

  it('should have values in username field', () => {
    expect(wrapper.find('#username').props().value).toEqual('Hulk');
  });

  it('should have values in email field', () => {
    expect(wrapper.find('#email').props().value).toEqual('nate@gmail.com');
  });

  it('should have values in password field', () => {
    expect(wrapper.find('#password').props().value).toEqual('123456');
  });

  it('should have values in confirm password field', () => {
    expect(wrapper.find('#confirmPassword').props().value).toEqual('123');
  });

  it('should have error values', () => {
    expect(wrapper.find('#username-error').contains('Username Error'));
    expect(wrapper.find('#email-error').contains('Email Error'));
    expect(wrapper.find('#password-error').contains('Password Error'));
    expect(wrapper.find('#confirmPassword-error').contains('Confirm Password Error'));
  });
});
