import React from 'react';
import PropTypes from 'prop-types';

const TableBody = ({ data }) => (
  <tbody>
    {
      data.map(row =>
        (
          <tr key={row.rowId} >
            <th scope="row">{row.rowName}</th>
            {row.rowData.map(cell => <td key={cell.id} className="text-center">{cell.data}</td>)}
          </tr>
        )
      )
    }
  </tbody>
);

TableBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableBody;
