import React from 'react';
import { shallow, mount } from 'enzyme';
import RegisterForm from './form';

const mockApiState = {
  loading: false,
  error: { data: '' },
  data: '',
};

const mockValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const mockErrors = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

describe('<RegisterForm />', () => {
  const wrapper = shallow(
    <RegisterForm
      apiState={mockApiState}
      values={mockValues}
      errors={mockErrors}
      onChange={jest.fn}
      onSubmit={jest.fn}
    />,
  );

  it('should have an username field', () => {
    expect(wrapper.find('#username').length).toEqual(1);
  });

  it('should have a email field', () => {
    expect(wrapper.find('#email').length).toEqual(1);
  });

  it('should have a password field', () => {
    expect(wrapper.find('#password').length).toEqual(1);
  });

  it('should have a confirmPassword field', () => {
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

  it('should have proper props for confirmPassword field', () => {
    expect(wrapper.find('#confirmPassword').props()).toEqual({
      id: 'confirmPassword',
      invalid: false,
      value: '',
      onChange: expect.any(Function),
      placeholder: 'Speak friend, and enter...',
      type: 'password',
    });
  });

  it('should display errors under fields if blank', () => {
    wrapper.find('#register-form').simulate('submit', {
      preventDefault: jest.fn(),
    });
    expect(wrapper.find('#errors-username').contains('Warrior! We must know your name for the battle field!'));
    expect(wrapper.find('#errors-email').contains('You must provide this, for passage!'));
    expect(wrapper.find('#errors-password').contains('You must provide this, for passage!'));
    expect(wrapper.find('#errors-confirmPassword').contains('You must provide this, for passage!'));
  });

  // it('should set the email value on change event', () => {
  //   wrapper.find('#email').simulate('change', {
  //     persist: jest.fn(),
  //     target: {
  //       id: 'email',
  //       value: 'freyo@gmail.com',
  //     },
  //   });
  //   expect(wrapper.find('#email')).toEqual('freyo@gmail.com');
  // });
});
