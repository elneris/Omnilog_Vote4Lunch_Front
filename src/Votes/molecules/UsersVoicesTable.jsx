import React from 'react';
import { connect } from 'react-redux';

import { Table } from '../../Core';

const mstp = ({ allVoicesForAVote, getPlacesList }) => ({
  allVoicesForAVote,
  getPlacesList,
});

export default connect(mstp)(({ allVoicesForAVote, getPlacesList, voteUrl }) => (
  <Table
    data={allVoicesForAVote.result}
    headList={getPlacesList.result[voteUrl]}
  />
));
