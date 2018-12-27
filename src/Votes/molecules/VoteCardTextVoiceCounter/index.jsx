import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

const VoteCardTextVoiceCounter = ({ placeId, voiceCount }) => {
  // Get the number of voices for the place
  let filteredVoiceCountValue = { count: 0, place: placeId };

  if (voiceCount.length > 0) {
    const filteredVoiceCount = voiceCount
      .filter(
        element => element.place === placeId
      );

    if (filteredVoiceCount.length !== 0) {
      [filteredVoiceCountValue] = filteredVoiceCount;
    }
  }

  return (
    <h5 className="card-text text-center">
      {'Votes : '}
      {filteredVoiceCountValue.count}
    </h5>
  );
};

VoteCardTextVoiceCounter.propTypes = {
  placeId: PropTypes.number.isRequired,
  voiceCount: PropTypes.arrayOf(PropTypes.object),
};

const mstp = ({
  getVoicesCount,
}) => ({
  voiceCount: getVoicesCount,
});

export default connect(mstp)(VoteCardTextVoiceCounter);
