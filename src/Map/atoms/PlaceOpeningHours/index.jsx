/* eslint-disable react/no-array-index-key */
import React from 'react';

import PropTypes from 'prop-types';

const PlaceOpeningHours = ({ openingHours }) => (
  <div>
    {
      openingHours.split(';').map((e, i) => <p className="text-center" key={i}>{e}</p>)
    }
  </div>
);

PlaceOpeningHours.propTypes = {
  openingHours: PropTypes.string.isRequired,
};

export default PlaceOpeningHours;
