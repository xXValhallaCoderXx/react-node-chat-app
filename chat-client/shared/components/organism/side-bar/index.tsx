import React from 'react';
import captialize from 'lodash/capitalize';
import get from "lodash/get";
import { Nav, Row } from 'reactstrap';
import {sortMembers} from "./utils";

const styles = require('./styles.module.scss');

interface Props {
  roomName: string;
  members: any;
}

const Sidebar = ({ roomName, members }: Props) => {
  return (
    <Nav className={`h-100 p-3 ${styles.sidebar}`} vertical>
      <Row className="m-0">
        <h4>{captialize(roomName)}</h4>
      </Row>
      <h6>Members</h6>
      <ul>{renderMembers()}</ul>
    </Nav>
  );

  function renderMembers() {
    const sortedMembers = sortMembers(get(members, []));
    return sortedMembers.map((member: any, index: number) => {
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
