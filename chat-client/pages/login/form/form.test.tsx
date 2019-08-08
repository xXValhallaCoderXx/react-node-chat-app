import React from 'react';
import { shallow } from 'enzyme';
import Form from './form';

const mockApiState = {
  loading: false,
  error: { data: ""},
  data: ""
}

const mockValues = {
  email: "",
  password: ""
}

const mockErrors = {
  email: "",
  password: ""
}

describe('Login Form', () => {
  const wrapper = shallow(<Form apiState={mockApiState} values={mockValues} errors={mockErrors} onChange={jest.fn} onSubmit={jest.fn} />);
  // it('Renders correctly', () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

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

  // it('should set the email value on change event', () => {
  //   wrapper.find('#email').simulate('change', {
  //     persist: jest.fn(),
  //     target: {
  //       id: 'email',
  //       value: 'freyo@gmail.com',
  //     },
  //   });
  //   expect(wrapper.find('#email').prop('value')).toEqual('freyo@gmail.com');
  // });

  it('should display errors under fields if blank', () => {
    wrapper.find('#login-form').simulate('submit', {
      preventDefault: jest.fn(),
    });
    expect(wrapper.find('#email-error').contains('Warrior! We must know your name for the battle field!'));
    expect(wrapper.find('#password-error').contains('You must provide this, for passage!'));
  });
});
