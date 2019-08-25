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
        <h4 id="room-name">{captialize(roomName)}</h4>
      </Row>
      <div className={styles.divider} />
      <Container className="mt-3">
        <h6>Room Members</h6>
        <ul>{renderMembers()}</ul>
      </Container>
    </Nav>
  );

  function renderMembers() {
    const membersOrError = sortMembers(members || []);
    if(membersOrError.isFailure){
      // Handle Failure
    }
    return membersOrError.getValue().map((member: any, index: number) => {
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
