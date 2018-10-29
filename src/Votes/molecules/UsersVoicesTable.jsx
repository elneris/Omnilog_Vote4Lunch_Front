import React from 'react';
import { connect } from 'react-redux';

import shortid from 'shortid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { Table } from '../../Core';

const mstp = ({ allVoicesForAVote, getPlacesList }) => ({
  allVoicesForAVote,
  getPlacesList,
});

/* eslint no-param-reassign: ["error", { "props": false }] */
// create an array of objects to display in a table
function dataToArray(data, headList) {
  const arrayByPseudo = data.reduce((r, a) => {
    r[a.pseudo] = r[a.pseudo] || [];
    r[a.pseudo].push(a);
    return r;
  }, Object.create(null));

  const result = [];
  Object.keys(arrayByPseudo).forEach((key) => {
    const obj = { rowId: shortid.generate(), rowName: key, rowData: [] };
    for (let i = 0; i < headList.length; i += 1) {
      const exist = arrayByPseudo[key].find(e => e.placeId === headList[i].id);
      if (exist) {
        obj.rowData.push({ id: shortid.generate(), data: <FontAwesomeIcon color="green" icon={faCheck} /> });
      } else {
        obj.rowData.push({ id: shortid.generate(), data: '' });
      }
    }
    result.push(obj);
  });

  return result;
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
      dark
    />
  );
});
