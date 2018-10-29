import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import moment from 'moment';
import 'moment/locale/fr';

import { Button } from 'reactstrap';


const EndDate = ({ remainingTime }) => {
  moment.locale('fr');

  let voteState = 'le vote termine';
  if (moment(remainingTime) < moment()) {
    voteState = "le vote s'est terminé";
  }
  const fromNow = moment(remainingTime).fromNow();

  return (
    <Button>
      {voteState} {fromNow}
    </Button>
  );
};

const mstp = ({ getAVote }) => ({
  remainingTime: getAVote.end_date,
});

EndDate.propTypes = {
  remainingTime: PropTypes.string.isRequired,
};

export default connect(mstp)(EndDate);
