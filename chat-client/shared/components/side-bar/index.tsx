
import React from 'react';
import { Nav } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <Nav className="h-100" vertical style={{ backgroundColor: 'red' }}>
        <div>Header</div>
        <div>Header</div>
      </Nav>
    );
  }
}