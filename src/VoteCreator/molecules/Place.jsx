import MaterialIcon from 'material-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { ListGroupItem, Button } from 'reactstrap';

import { deleteAPlace } from '../../actions/deleteAPlace';

const Place = ({ place, type, vote_id, place_id, deleteAPlace: dAP }) => (
  <ListGroupItem>
    <p className="my-1">
      {type === 'restaurant' ? <MaterialIcon icon="restaurant" /> : <MaterialIcon icon="fastfood" />} {place}
      <span className="align-top">
        <Button
          color="danger"
          size="sm"
          className="float-right"
          onClick={() => dAP(vote_id, place_id)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </span>

    </p>
  </ListGroupItem>
);

Place.propTypes = {
  place: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  vote_id: PropTypes.string.isRequired,
  place_id: PropTypes.string.isRequired,
  deleteAPlace: PropTypes.func.isRequired,
};

const mdtp = dispatch => bindActionCreators({ deleteAPlace }, dispatch);

export default connect(null, mdtp)(Place);
