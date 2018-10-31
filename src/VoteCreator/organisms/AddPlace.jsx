import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap';

import { PlaceMap } from '../../Map';
import { CreateAVotePlaces } from './';

const AddPlace = ({ voteDataId, userDataPseudo }) => {
  if (voteDataId === '') {
    return <Redirect to="/" />;
  }

  return (
    <Container fluid className="AddPlace">
      <Row noGutters className="justify-content-center align-items-center h-100">
        <Col>
          <h5 className="text-white text-center my-3">Maintenant {userDataPseudo}, ajoute des restaurants</h5>
        </Col>
      </Row>
      <Row noGutters className="justify-content-center align-items-center h-100">
        <Col
          xs="12"
          md="8"

        >
          <PlaceMap />
        </Col>
        <Col
          xs="12"
          md="4"
          className="FormBlock text-center"
        >
          <CreateAVotePlaces />
        </Col>
      </Row>
    </Container>
  );
};

AddPlace.propTypes = {
  voteDataId: PropTypes.string.isRequired,
  userDataPseudo: PropTypes.string.isRequired,
};

const mstp = ({ voteData, userData }) => ({
  voteDataId: voteData.id,
  userDataPseudo: userData.pseudo,
});

export default connect(mstp)(AddPlace);
