import React from 'react';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt } from '@fortawesome/free-solid-svg-icons';

const PlaceEmail = ({ email }) => (
  <a href={`mailto:${email}`}>
    <FontAwesomeIcon
      color="#26010F"
      icon={faAt}
      size="2x"
    />
  </a>
);

PlaceEmail.propTypes = {
  email: PropTypes.string.isRequired,
};

export default PlaceEmail;
