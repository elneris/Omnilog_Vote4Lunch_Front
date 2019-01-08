import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import isTouchDevice from 'is-touch-device';

import PropTypes from 'prop-types';

class VoteCardTextVoiceCounter extends Component {
  constructor() {
    super();

    this.getVoiceCountValue = this.getVoiceCountValue.bind(this);
  }

  getVoiceCountValue() {
    // Get the number of voices for the place
    const { placeId, voteId, voiceCount } = this.props;

    let filteredVoiceCountValue = { count: 0, place: placeId };

    if (voiceCount.length > 0) {
      const filteredVoiceCount = voiceCount
        .filter(
          element => element.place === placeId
          && element.voteId === voteId
        );

      if (filteredVoiceCount.length !== 0) {
        [filteredVoiceCountValue] = filteredVoiceCount;
      }
    }
    return filteredVoiceCountValue;
  }

  render() {
    const { displayUsersList, hideUsersList } = this.props;
    const filteredVoiceCountValue = this.getVoiceCountValue();
    const touchDevice = isTouchDevice();

    return (
      <h5 className="card-text text-center">
        {'Votes : '}
        {filteredVoiceCountValue.count}
        { touchDevice ? (
          <FontAwesomeIcon
            className="ml-2"
            color="#26010F"
            icon={faCaretDown}
            onTouchStart={displayUsersList}
            onTouchEnd={hideUsersList}
          />
        ) : ''}
      </h5>
    );
  }
}

VoteCardTextVoiceCounter.propTypes = {
  displayUsersList: PropTypes.func.isRequired,
  hideUsersList: PropTypes.func.isRequired,
  placeId: PropTypes.number.isRequired,
  voiceCount: PropTypes.arrayOf(PropTypes.object),
  voteId: PropTypes.number.isRequired,
};

const mstp = ({
  getVoicesCount,
  getAVote,
}) => ({
  voiceCount: getVoicesCount,
  voteId: getAVote.id
});

export default connect(mstp)(VoteCardTextVoiceCounter);
