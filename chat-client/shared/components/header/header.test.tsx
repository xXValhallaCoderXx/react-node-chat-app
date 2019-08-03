import React from 'react';
import { shallow } from 'enzyme';
import Header from './index';

describe('<Header />', () => {
  
  // it('Renders correctly', () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

  it('show not display brand or links', () => {
    const wrapper = shallow(<Header showBrand={false} />);
    expect(wrapper.find('#nav-brand').length).toEqual(0);
  });

  it('should display nav bar brand', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('#nav-brand').length).toEqual(1);
  });

  it('should display nav bar links', () => {
    const links = [{path: "/", label: "home"}]
    const wrapper = shallow(<Header links={links} />);
    expect(wrapper.find('#link-0').length).toEqual(1);
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

  // it('should display errors under fields if blank', () => {
  //   wrapper.find('#login-form').simulate('submit', {
  //     preventDefault: jest.fn(),
  //   });
  //   expect(wrapper.find('#email-error').contains('Warrior! We must know your name for the battle field!'));
  //   expect(wrapper.find('#password-error').contains('You must provide this, for passage!'));
  // });

  // it('should display server error if "error" prop is passed', () => {
  //   expect(wrapper.find('#login-server-error').contains('Server error'));
  // });
});
