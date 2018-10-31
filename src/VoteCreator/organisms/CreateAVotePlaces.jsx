import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Row, Col, ListGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import { Place } from '../';

const CreateAVotePlaces = ({ voteData }) => {
  let disabledButton = true;
  if (voteData.places.length >= 2) {
    disabledButton = false;
  }
  return (
    <Row className="pb-3 px-2">
      <Col>
        <ListGroup>
          {
            voteData.places.map(place => (
              <Place
                key={place.id}
                place_id={place.id}
                place={place.name}
                type={place.type}
                vote_id={voteData.id}
              />
            ))
          }
        </ListGroup>
        <Button
          color="success"
          disabled={disabledButton}
          className="mt-4"
          tag={Link}
          to={`/vote/${voteData.url}`}
        >Créer le vote</Button>
      </Col>
    </Row>
  );
};

CreateAVotePlaces.propTypes = {
  voteData: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mstp = ({ voteData }) => ({
  voteData
});

export default connect(mstp)(CreateAVotePlaces);

