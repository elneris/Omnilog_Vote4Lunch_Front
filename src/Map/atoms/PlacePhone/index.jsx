import React from 'react';

import PropTypes from 'prop-types';

const PlacePhone = ({ phone }) => (
  <p className="text-center">
    {'tel : '}
    {phone}
  </p>
);

PlacePhone.propTypes = {
  phone: PropTypes.string.isRequired,
};

export default PlacePhone;
