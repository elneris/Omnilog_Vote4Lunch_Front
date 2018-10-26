import React from 'react';

import PropTypes from 'prop-types';

const Title5 = ({ content, color }) => {
  const classList = `text-${color} text-center my-3`;

  return (<h5 className={classList}>{content}</h5>);
};

Title5.propTypes = {
  content: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Title5;
