import React from 'react';
import { shallow } from 'enzyme';
import { Members } from 'chat-client/shared/types';
import Sidebar from './index';

const members: Members[] = [{ email: 'renate@gmail.com', username: 'Reggie', online: true }];

const roomName = 'Asgard';

describe('Sidebar with valid props', () => {
  const wrapper = shallow(<Sidebar roomName={roomName} members={members} />);

  it('should have values in email field', () => {
    expect(wrapper.find('#room-name').contains(roomName));
  });
});
