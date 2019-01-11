import React from 'react';

import PropTypes from 'prop-types';

import {
  PlaceAddress,
  PlaceCity,
  PlaceOpeningHours,
  PlacePhone,
  PlaceWebInfos,
} from '../..';

const PlaceInfos = ({ restaurant }) => (
  <div className="PlaceInfos">
    {
      restaurant.address ? <PlaceAddress address={restaurant.address} /> : null
    }
    {
      restaurant.city ? <PlaceCity city={restaurant.city} /> : null
    }
    {
      restaurant.phone ? <PlacePhone phone={restaurant.phone} /> : null
    }
    {
      restaurant.website || restaurant.email
        ? <PlaceWebInfos website={restaurant.website} email={restaurant.email} />
        : null
    }
    {
      restaurant.opening_hours
        ? <PlaceOpeningHours openingHours={restaurant.opening_hours} />
        : null
    }
  </div>
);

PlaceInfos.propTypes = {
  restaurant: PropTypes.shape({
    address: PropTypes.string,
    city: PropTypes.string,
    phone: PropTypes.string,
    website: PropTypes.string,
    opening_hours: PropTypes.string,
  }).isRequired,
};

export default PlaceInfos;
