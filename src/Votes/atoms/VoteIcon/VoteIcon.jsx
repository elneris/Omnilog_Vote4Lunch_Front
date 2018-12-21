import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as RegularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';

import './VoteIcon.scss';

import PropTypes from 'prop-types';

import { addVoice, deleteVoice } from '../../actions';

class VoteIcon extends Component {
  constructor() {
    super();
    this.voteOnClick = this.voteOnClick.bind(this);
  }

  voteOnClick() {
    const {
      email,
      placeId,
      pseudo,
      vote,
      voteUrl,
      addVoice: addV,
      deleteVoice: delV,
    } = this.props;

    if (!vote) {
      addV(voteUrl, placeId, pseudo, email);
    } else {
      delV(voteUrl, placeId, pseudo, email);
    }
  }

  render() {
    const { disable, vote } = this.props;
    return (
      <div className="VoteIcon mt-auto">
        <FontAwesomeIcon
          color="#E82CA6"
          size="3x"
          icon={vote ? SolidHeart : RegularHeart}
          onClick={() => this.voteOnClick()}
          className={disable ? 'disabled-icon' : ''}
        />
      </div>
    );
  }
}

VoteIcon.propTypes = {
  addVoice: PropTypes.func.isRequired,
  deleteVoice: PropTypes.func.isRequired,
  email: PropTypes.string,
  pseudo: PropTypes.string,
  voteUrl: PropTypes.string.isRequired,
  // pass as props by parent
  disable: PropTypes.bool,
  vote: PropTypes.bool,
  placeId: PropTypes.number.isRequired,
};

const mstp = ({
  getAVote,
  userData,
}) => ({
  voteUrl: getAVote.url,
  pseudo: userData.pseudo,
  email: userData.email,
});

const mdtp = dispatch => bindActionCreators({
  addVoice,
  deleteVoice,
}, dispatch);

export default connect(mstp, mdtp)(VoteIcon);
