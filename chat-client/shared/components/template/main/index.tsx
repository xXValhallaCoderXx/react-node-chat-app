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
    <div className={containerClass}>
      {header && header}
      <div className="d-flex flex-row h-100" style={{ paddingBottom: footer ? 100 : 0 }}>
        {sidebar && (
          <Col className="h-100 p-0" xs="1" sm="4" md="3" lg="2" xl="1" style={{ minWidth: 215 }}>
            {sidebar}
          </Col>
        )}
        {content && <Col className="h-100">{content}</Col>}
      </div>
      {footer && (
        <div className={styles.footer} id="footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Layout;
