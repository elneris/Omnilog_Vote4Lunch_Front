import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import moment from 'moment';
import 'moment/locale/fr';

import { Button } from 'reactstrap';


const EndDate = ({ remainingTime }) => {
  
  moment.locale('fr');

  const fromNow = moment(remainingTime).fromNow();
  console.log(fromNow);
  
  return (
  <Button>
    le vote termine {fromNow}
  </Button>
)};

const mstp = ({ getAVote }) => ({
  remainingTime: getAVote.result.end_date,
});

EndDate.propTypes = {
  remainingTime: PropTypes.string.isRequired,
};

export default connect(mstp)(EndDate);
