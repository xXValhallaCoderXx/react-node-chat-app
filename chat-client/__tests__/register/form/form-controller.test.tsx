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
      username: "Warrior! We must know your name for the battle field!",
      email: 'You must provide this, for passage!',
      password: 'You must provide this, for passage!',
      confirmPassword: "You must provide this, for passage!"
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
