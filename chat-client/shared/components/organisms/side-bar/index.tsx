import React from 'react';
import captialize from 'lodash/capitalize';
import { Nav, Row, Container } from 'reactstrap';
import { sortMembers } from './utils';

const styles = require('./styles.module.scss');

interface Props {
  roomName: string;
  members: any;
}

const Sidebar = ({ roomName, members }: Props) => {
  return (
    <Nav className={`h-100 ${styles.sidebar}`} vertical>
      <Row className="m-0 p-2">
        <h4>{captialize(roomName)}</h4>
      </Row>
      <div style={{ height: 3, backgroundColor: 'white' }} />
      <Container className="mt-3">
        <h6>Members</h6>
        <ul>{renderMembers()}</ul>
      </Container>
    </Nav>
  );

  function renderMembers() {
    const result = sortMembers(members || []);
    return result.map((member: any, index: number) => {
      const offlineStyle = member.online ? '' : 'text-muted';
      return (
        <li className={`ml-n4 ${offlineStyle}`} key={index}>
          {captialize(member.username)}
        </li>
      );
    });
  }
};

export default Sidebar;
