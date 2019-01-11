import React from 'react';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons';

const PlaceWebsite = ({ website }) => (
  <a href={website} target="blank">
    <FontAwesomeIcon
      color="#26010F"
      icon={faGlobeEurope}
      size="2x"
    />
  </a>

);

PlaceWebsite.propTypes = {
  website: PropTypes.string.isRequired,
};


export default PlaceWebsite;
