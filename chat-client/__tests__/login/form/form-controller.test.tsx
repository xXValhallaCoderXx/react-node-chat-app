import React from 'react';
import { shallow } from 'enzyme';
import FormController from "chat-client/pages/login/form/form-controller";

const mockLoginApi = jest.fn();
const mockPush = jest.fn();
const mockStatus = {};

describe('Login Form', () => {
  const wrapper = shallow<FormController>(<FormController status={mockStatus} loginApi={mockLoginApi} />);

  it('should have validation errors', () => {
    const instance = wrapper.instance();
    const mockEvent = {
      preventDefault: () => {},
    };
    instance.onSubmit(mockEvent);
    expect(wrapper.state().errors).toEqual({
      email: 'Warrior! We must know your name for the battle field!',
      password: 'You must provide this, for passage!',
    });
  });

  it('should updated the email state', () => {
    const instance = wrapper.instance();
    instance.onChange({
      target: {
        id: 'email',
        value: 'freyo@gmail.com',
      },
    });
    expect(wrapper.state().values.email).toEqual('freyo@gmail.com');
  });

  it('should update the password state', () => {
    const instance = wrapper.instance();
    instance.onChange({
      target: {
        id: 'password',
        value: '123456',
      },
    });
    expect(wrapper.state().values.password).toEqual('123456');
  });


});
