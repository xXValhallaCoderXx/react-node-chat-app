import React, { ReactNode } from 'react';
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
          <Col className="h-100" md="3" lg="2">
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

export default Layout;