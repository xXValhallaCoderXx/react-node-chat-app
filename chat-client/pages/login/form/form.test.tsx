import React from 'react';
import { mount } from 'enzyme';
import Form from './form';

const mockApiState = {
  loading: false,
  error: '',
  success: false,
  data: '',
};

const mockValues = {
  email: '',
  password: '',
};

const mockErrors = {
  email: '',
  password: '',
};

describe('Login Form', () => {
  const wrapper = mount(<Form values={mockValues} onChange={jest.fn} onSubmit={jest.fn} />);
  // it('Renders correctly', () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

  it('should have an email field', () => {
    expect(wrapper.find('#email').hostNodes().length).toEqual(1);
  });

  // it('should have a password field', () => {
  //   expect(wrapper.find('#password').length).toEqual(1);
  // });

  // it('should have proper props for email field', () => {
  //   expect(wrapper.find('#email').hostNodes().props()).toEqual({
  //     id: 'email',
  //     invalid: false,
  //     value: '',
  //     onChange: expect.any(Function),
  //     placeholder: 'What do you hail as warrior?',
  //     type: 'email',
  //   });
  // });


  // it('should display errors under fields if blank', () => {
  //   wrapper.find('#login-form').simulate('submit', {
  //     preventDefault: jest.fn(),
  //   });
  //   expect(wrapper.find('#email-error').contains('Warrior! We must know your name for the battle field!'));
  //   expect(wrapper.find('#password-error').contains('You must provide this, for passage!'));
  // });
});
