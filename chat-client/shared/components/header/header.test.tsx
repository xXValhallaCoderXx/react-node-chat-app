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
});
