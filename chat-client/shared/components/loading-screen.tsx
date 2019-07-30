import React from 'react';
import { Container, Spinner } from 'reactstrap';
const styles = require('./styles.module.scss');

const containerStyle = `
 ${styles.authLayoutMain} h-100 p-0 d-flex flex-column justify-content-center align-items-center
`;

const LoadingScreen = () => {
  return (
    <Container fluid className={containerStyle}>
      <h1 className="mb-3 text-brand-accent">Loading</h1>
      <Spinner color="brand-accent" style={{ width: '4rem', height: '4rem' }} type="grow" />
    </Container>
  );
};

export default LoadingScreen;
