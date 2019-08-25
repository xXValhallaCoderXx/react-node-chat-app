import React from 'react';
import { shallow } from 'enzyme';
import FormController from "chat-client/pages/registration/form";

const mockLoginApi = jest.fn();
const mockStatus = {};

describe('Register Form', () => {
  const wrapper = shallow<FormController>(<FormController status={mockStatus} onSubmit={mockLoginApi} />);

  it('should have validation errors', () => {
    const instance = wrapper.instance();
    const mockEvent = {
      preventDefault: () => {},
    };
    instance.onSubmit(mockEvent);
    expect(wrapper.state().errors).toEqual({
      username: "Your name is required for the battle field!",
      email: 'Your email is required, for passage!',
      password: 'Your password is required, for passage!',
      confirmPassword: "Your password is required, for passage!"
    });
  });

  it('should updated the username state', () => {
    const instance = wrapper.instance();
    instance.onChange({
      target: {
        id: 'username',
        value: 'HulkMad',
      },
    });
    expect(wrapper.state().values.username).toEqual('HulkMad');
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

  it('should update the confirm password state', () => {
    const instance = wrapper.instance();
    instance.onChange({
      target: {
        id: 'confirmPassword',
        value: '123456',
      },
    });
    expect(wrapper.state().values.confirmPassword).toEqual('123456');
  });
});
