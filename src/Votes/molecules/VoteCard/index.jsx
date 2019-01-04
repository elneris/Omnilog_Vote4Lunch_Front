import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { VoteIcon, VoteCardTextVoiceCounter, VoteCardTextUsersList } from '../..';

import { getVoiceCount } from '../../actions';

class VoteCard extends Component {
  constructor() {
    super();

    this.displayUsersList = this.displayUsersList.bind(this);
    this.hideUsersList = this.hideUsersList.bind(this);

    this.state = {
      displayTip: false,
    };
  }

  componentDidMount() {
    const { voteUrl, restaurant, getVoiceCount: getVC } = this.props;
    getVC(voteUrl, restaurant.id);
  }

  displayUsersList() {
    this.setState({
      displayTip: true,
    });
  }

  hideUsersList() {
    this.setState({
      displayTip: false,
    });
  }

  render() {
    const { restaurant } = this.props;
    const { displayTip } = this.state;

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
                  onMouseEnter={() => this.displayUsersList()}
                  onMouseLeave={() => this.hideUsersList()}
                >
                  <VoteIcon placeId={restaurant.id} />
                </h5>
              </div>
              <VoteCardTextVoiceCounter placeId={restaurant.id} />
              { displayTip ? <VoteCardTextUsersList placeId={restaurant.id} /> : ''}
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
};

const mstp = ({
  getAVote,
}) => ({
  voteId: getAVote.id,
  remainingTime: getAVote.end_date,
});

const mdtp = dispatch => bindActionCreators({
  getVoiceCount,
}, dispatch);

export default connect(mstp, mdtp)(VoteCard);
