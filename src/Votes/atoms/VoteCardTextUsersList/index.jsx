import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { getAllVoicesForAVote } from '../../actions';

class VoteCardTextUsersList extends Component {
  constructor() {
    super();

    this.getPseudo = this.getPseudo.bind(this);
  }

  componentDidMount() {
    const { getAllVoicesForAVote: getAVFAV, voteUrl } = this.props;

    getAVFAV(voteUrl);
  }

  getPseudo() {
    const { allVoices, pseudo, placeId } = this.props;

    const pseudoArray = allVoices.filter(e => e.placeId === placeId && e.pseudo !== pseudo);

    let pseudoList;

    if (pseudoArray.length === 0) {
      pseudoList = false;
    } else if (pseudoArray.length === 1) {
      pseudoList = [`${pseudoArray[0].pseudo} `];
    } else {
      pseudoList = pseudoArray.map((e, i) => {
        switch (i) {
          case pseudoArray.length - 1:
            return `et ${e.pseudo} `;

          case pseudoArray.length - 2:
            return `${e.pseudo} `;

          default:
            return `${e.pseudo}, `;
        }
      });
    }
    return pseudoList;
  }

  render() {
    const votedUsers = this.getPseudo();

    if (votedUsers) {
      return (
        <p className="VoteCardTextUsersList text-center">
          {
            votedUsers.map(e => e)
          }
          {votedUsers.length === 1 ? 'a choisi ce lieu' : 'ont choisi ce lieu'}
        </p>
      );
    }
    return (null);
  }
}

VoteCardTextUsersList.propTypes = {
  getAllVoicesForAVote: PropTypes.func.isRequired,
  allVoices: PropTypes.arrayOf(PropTypes.object),
  voteUrl: PropTypes.string.isRequired,
  pseudo: PropTypes.string.isRequired,
  placeId: PropTypes.number.isRequired,
};

const mstp = ({
  allVoicesForAVote,
  getAVote,
  userData
}) => ({
  allVoices: allVoicesForAVote.result,
  voteUrl: getAVote.url,
  pseudo: userData.pseudo,
});

const mdtp = dispatch => bindActionCreators({
  getAllVoicesForAVote,
}, dispatch);

export default connect(mstp, mdtp)(VoteCardTextUsersList);
