import React from 'react';
import { shallow } from 'enzyme';
import FormController from './index';


describe('Login Form', () => {
  const wrapper = shallow<FormController>(<FormController />);

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
