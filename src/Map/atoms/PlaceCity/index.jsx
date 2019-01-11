import React from 'react';

import PropTypes from 'prop-types';

const PlaceCity = ({ city }) => (
  <p className="text-center font-weight-bold">
    {city}
  </p>
);

PlaceCity.propTypes = {
  city: PropTypes.string.isRequired,
};

export default PlaceCity;
