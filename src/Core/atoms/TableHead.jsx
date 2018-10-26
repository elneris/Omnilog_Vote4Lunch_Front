import React from 'react';
import PropTypes from 'prop-types';

const TableHead = ({ headList }) => (
  <thead>
    <tr>
      <th />
      {headList.map(e => <th key={e.id}>{e.name}</th>)}
    </tr>
  </thead>
);

TableHead.defaultProps = {
  headList: [],
};

TableHead.propTypes = {
  headList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableHead;
