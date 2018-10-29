import React from 'react';
import PropTypes from 'prop-types';

const TableBody = ({ data }) => (
  <tbody>
    {
      data.map(e =>
        (
          <tr>
            <th scope="row">{e.pseudo}</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        )
      )
    }
  </tbody>);

TableBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableBody;
