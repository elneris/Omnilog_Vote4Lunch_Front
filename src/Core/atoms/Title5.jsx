import React from 'react';

import PropTypes from 'prop-types';

const Title5 = ({ content, color, alignment }) => {
  const textColor = color ? ` text-${color}` : '';
  const textAlignment = alignment ? ` text-${alignment}` : '';
  const classList = `${textColor}${textAlignment}`;

  return (
    <h5 className={classList}>{content}</h5>
  );
};

Title5.propTypes = {
  content: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  alignment: PropTypes.string.isRequired,
};

export default Title5;
