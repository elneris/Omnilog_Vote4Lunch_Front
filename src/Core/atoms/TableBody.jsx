import React from 'react';
import PropTypes from 'prop-types';

const TableBody = ({ data = [], headList = [] }) => {
  const body = data;
  return (
    <tbody>
      {
        body.map(e =>
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
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>);
};

TableBody.defaultProps = {
  headList: [],
};

TableBody.propTypes = {
  headList: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableBody;
