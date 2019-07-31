import React, { Fragment } from 'react';
import { shallow } from 'enzyme';
import Layout from './index';

describe('Layout', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(<Layout header={<Fragment>Header</Fragment>} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.exists('#header')).toBe(true);
    expect(wrapper.find('#header').length).toBe(1);
    expect(wrapper.find('#header').text()).toEqual('Header');
    expect(wrapper.exists('#footer')).toBe(false);
  });
});
