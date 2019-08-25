import React from 'react';
import { Spinner, Row } from 'reactstrap';
const styles = require("./styles.module.scss");

const LoadingScreen = () => {
  return (
    <div className={styles.main}>
      <Row className="align-items-center">
        <h3 className="mr-3">Loading...</h3>
        <Spinner />
      </Row>
    </div>
  );
};

export default LoadingScreen;
