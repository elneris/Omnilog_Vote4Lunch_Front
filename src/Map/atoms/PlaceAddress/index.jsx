import React from 'react';

import PropTypes from 'prop-types';

const PlaceAddress = ({ address }) => (
  <p className="text-center">
    {address}
  </p>
);

PlaceAddress.propTypes = {
  address: PropTypes.string.isRequired,
};

export default PlaceAddress;
