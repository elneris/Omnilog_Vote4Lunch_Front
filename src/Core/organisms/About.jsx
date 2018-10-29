import React from 'react';

import { Container, Row, Col } from 'reactstrap';

export default () => (
  <Container className="APropos" fluid>
    <Row noGutters className="justify-content-center align-items-center w-100 pt-5">
      <Col xs="12" lg="6" className="bg-lighter round-corners px-3">

        <Row noGutters className="justify-content-center align-items-center h-100 pt-5">
          <Col>
            <h1 className="text-center">A propos...</h1>
          </Col>
        </Row>
        <Row noGutters className="justify-content-center align-items-center h-100 py-5">
          <Col>
            <p className="text-center">
              Ce site est réalisé avec React Redux,
              servi par NodeJS avec une base de données Postgresql.<br />
              Il est hébergé grâce à Heroku.
            </p>
            <p className="text-center">
                Le code est hébergé sur Github, il est visible <a href="https://github.com/Humch/vote4lunch" className="text-white">ici</a>
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
);
