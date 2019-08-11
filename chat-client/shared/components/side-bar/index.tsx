import React from 'react';
import captialize from 'lodash/capitalize';
import { Nav, Row } from 'reactstrap';

const styles = require('./styles.module.scss');

interface Props {
  roomName: string;
  members: any;
}

const Sidebar = ({ roomName, members }: Props) => {
  const checkMembers = members && members.length > 0 ? members : [];
  return (
    <Nav className={`h-100 p-3 ${styles.sidebar}`} vertical>
      <Row className="m-0">
        <h4>{captialize(roomName)}</h4>
      </Row>
      <h6>Members</h6>
      <ul>{renderMembers(checkMembers)}</ul>
    </Nav>
  );

  function renderMembers(checkMembers) {
    const sortedArray = checkMembers.sort((a, b) => {
      // Default to 0 - No sorting needed
      let returnVal = 0;
      // If 'a' is online, subtract 1 to move
      // 'a' up in the sort order
      if (a.online) {
        returnVal = returnVal - 1;
      }
      // If `b` is online add 1 to move 'b' up
      if (b.online) {
        returnVal = returnVal + 1;
      }
      return returnVal;
    });
    return sortedArray.map((member: any, index: number) => {
      const offlineStyle = member.online ? '' : 'text-muted';
      return (
        <li className={`ml-n4 ${offlineStyle}`} key={index}>
          {captialize(member.name)}
        </li>
      );
    });
  }
};

export default Sidebar;
