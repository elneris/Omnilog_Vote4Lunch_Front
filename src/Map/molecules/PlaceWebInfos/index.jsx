import React from 'react';

import PropTypes from 'prop-types';

import { PlaceEmail, PlaceWebsite } from '../..';

const PlaceWebInfos = ({ website, email }) => (
  <div className="row text-center">
    {
      website
        ? (
          <div className="col">
            <PlaceWebsite website={website} />
          </div>
        )
        : null
    }
    {
      email
        ? (
          <div className="col">
            <PlaceEmail email={email} />
          </div>)
        : null
    }
  </div>
);

PlaceWebInfos.propTypes = {
  email: PropTypes.string,
  website: PropTypes.string,
};

export default PlaceWebInfos;
