import React from 'react';
import PropTypes from 'prop-types';

import { Table as T } from 'reactstrap';

import { TableBody, TableHead } from '../atoms';

const Table = ({ data, headList = [] }) => {
  const list = headList.sort((a, b) => a.id - b.id);
  return (
    <T>
      <TableHead
        headList={list}
      />
      <TableBody
        headList={list}
        data={data}
      />
    </T>
  );
};

Table.defaultProps = {
  headList: [],
};

Table.propTypes = {
  headList: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
