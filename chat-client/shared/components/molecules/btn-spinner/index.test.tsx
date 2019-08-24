    
import React from 'react';
import { shallow } from 'enzyme';
import BtnSpinner from './index';

describe('<BtnSpinner />', () => {
  it('will render and not display spinner', () => {
    const wrapper = shallow(<BtnSpinner id="btn-test">Hello</BtnSpinner>);
    expect(wrapper.find('#btn-test').length).toEqual(1);
  });
  it('will render and display spinner', () => {
    const wrapper = shallow(
      <BtnSpinner loading id="btn-test">
        Hello
      </BtnSpinner>,
    );
    expect(wrapper.find('#btn-test').length).toEqual(1);
    expect(wrapper.find('#btn-spinner-btn-test').length).toEqual(1);
  });
  it('displays styles and classname passed', () => {
    const style = {
      backgroundColor: "red"
    }
    const className = "font-text";
    const wrapper = shallow(
      <BtnSpinner className={className} style={style} id="btn-test">
        Hello
      </BtnSpinner>,
    );

    expect(wrapper.find('#btn-test').length).toEqual(1);
    expect(wrapper.find('#btn-test').prop('style')).toEqual(style)
    expect(wrapper.find('#btn-test').prop('className')).toEqual(className)
  });
  it('callback onClick function', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <BtnSpinner onClick={onClick} id="btn-test">
        Hello
      </BtnSpinner>,
    );
    expect(wrapper.find('#btn-test').length).toEqual(1);
    wrapper.find('#btn-test').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});