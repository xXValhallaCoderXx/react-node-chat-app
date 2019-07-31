import React, { Component, ReactNode } from 'react';
import { Container, Col, Row } from 'reactstrap';
import classNames from 'classnames/bind';
const styles = require('./styles.module.scss');

const cx = classNames.bind(styles);

interface LayoutProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
}

const containerClass = cx({
  main: true,
});

const Layout = ({ header, sidebar, content, footer }: LayoutProps) => {
  return (
    <Container fluid className={containerClass}>
      {header && <div id="header">{header}</div>}
      <Row className="h-100">
        {sidebar && (
          <Col className="h-100" lg="2">
            <div className="h-100" id="sidebar">
              {sidebar}
            </div>
          </Col>
        )}
        {content && (
          <Col className="h-100">
            <div className="h-100" id="content">
              {content}
            </div>
          </Col>
        )}
      </Row>
      {footer && (
        <div className={styles.footer} id="footer">
          {footer}
        </div>
      )}
    </Container>
  );
};

{
  /* <Col md="auto" className="pl-0 pr-0">
          <RoomLayout.Sidebar>{result['sidebar']}</RoomLayout.Sidebar>
        </Col>
        <div className={`d-flex align-items-end flex-column w-100 ${styles.bgMain}`}>
          <div className={`pl-3 pr-3 ml-3 h-100 w-100 ${styles.messagesMain}`}>
            <RoomLayout.Messages>{result['messages']}</RoomLayout.Messages>
          </div>
          <div className="pl-3 pr-3 mb-3 mt-auto w-100">
            <RoomLayout.Input>{result['input']}</RoomLayout.Input>
          </div>
        </div> */
}

export default Layout;
