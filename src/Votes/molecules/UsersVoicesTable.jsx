import React from 'react';
import { connect } from 'react-redux';

import { Table } from '../../Core';

const mstp = ({ allVoicesForAVote, getPlacesList }) => ({
  allVoicesForAVote,
  getPlacesList,
});

function dataToArray(data, headList) {
  const arrayByPseudo = data.reduce((r, a) => {
    r[a.pseudo] = r[a.pseudo] || [];
    r[a.pseudo].push(a);
    return r;
  }, Object.create(null));
  console.log(arrayByPseudo);
  Object.keys(arrayByPseudo).forEach((key) => {
    console.log(key, obj[key]);
});

  return [];
}
export default connect(mstp)(({ allVoicesForAVote, getPlacesList, voteUrl }) => {
// sorting head for table
  let headList = [];
  if (getPlacesList.result[voteUrl]) {
    headList = getPlacesList.result[voteUrl].sort((a, b) => a.id - b.id);
  }
  const data = dataToArray(allVoicesForAVote.result, headList);

  return (
    <Table
      data={data}
      headList={headList}
    />
  );
});
