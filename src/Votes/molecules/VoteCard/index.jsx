import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import moment from 'moment';
import 'moment/locale/fr';

import { VoteIcon } from '../..';

import { getVoiceCount } from '../../actions';

moment.locale('fr');

class VoteCard extends Component {
  componentDidMount() {
    const { voteUrl, restaurant, getVoiceCount: getVC } = this.props;

    getVC(voteUrl, restaurant.id);
  }


  render() {
    const {
      restaurant,
      voiceCount,
      voteId,
      remainingTime,
      userData,
      userVoices,
    } = this.props;
    let disabledButton = false;

    // disable button if vote end date is exceeded
    const tooLate = moment(remainingTime).isBefore();
    if (tooLate) {
      disabledButton = true;
    }

    // Get the number of voices for the place
    let filteredVoiceCountValue = { count: 0, place: restaurant.id };

    if (voiceCount.length > 0) {
      const filteredVoiceCount = voiceCount
        .filter(
          element => element.place === restaurant.id
      && element.voteId === voteId
        );

      if (filteredVoiceCount.length !== 0) {
        [filteredVoiceCountValue] = filteredVoiceCount;
      }
    }

    let voted = false;

    if (userVoices.result.length > 0) {
      const filteredUserVoices = userVoices.result
        .filter(
          element => parseInt(element.voteId, 10) === voteId
            && element.pseudo === userData.pseudo
            && element.email === userData.email
            && parseInt(element.placeId, 10) === restaurant.id
        );
      if (filteredUserVoices.length !== 0) {
        voted = true;
      }
    }

    return (
      <div className="row mt-2">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="card-title d-flex flex-row">
                <h5>
                  {restaurant.name}
                </h5>
                <h5
                  className="text-right ml-auto"
                >
                  <VoteIcon
                    vote={voted}
                    disable={disabledButton}
                    placeId={restaurant.id}
                  />
                </h5>
              </div>


              <h5 className="card-text text-center">
                {'Votes : '}
                {filteredVoiceCountValue.count}
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VoteCard.propTypes = {
  getVoiceCount: PropTypes.func.isRequired,
  restaurant: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  voteUrl: PropTypes.string.isRequired,
  voteId: PropTypes.number.isRequired,
  voiceCount: PropTypes.arrayOf(PropTypes.object),
  remainingTime: PropTypes.string.isRequired,
  userVoices: PropTypes.shape({
    result: PropTypes.array.isRequired,
  }).isRequired,
  userData: PropTypes.shape({
    pseudo: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    authenticated: PropTypes.bool,
  }).isRequired,
};

const mstp = ({
  getVoicesCount,
  getAVote,
  userVoices,
  userData,
}) => ({
  voiceCount: getVoicesCount,
  voteId: getAVote.id,
  remainingTime: getAVote.end_date,
  userVoices,
  userData,
});

const mdtp = dispatch => bindActionCreators({
  getVoiceCount,
}, dispatch);

export default connect(mstp, mdtp)(VoteCard);
