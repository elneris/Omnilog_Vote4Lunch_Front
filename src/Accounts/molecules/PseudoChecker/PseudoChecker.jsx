import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { ValueChecker } from '../../../Core';

// eslint-disable-next-line react/prop-types
const PseudoChecker = ({ payload, loading }) => {
  let rendering = '';
  if (loading) {
    rendering = (
      <FontAwesomeIcon
        icon={faSpinner}
        spin
      />
    );
  } else if (payload) {
    rendering = <ValueChecker check={false} />;
  } else {
    rendering = <ValueChecker check />;
  }
  return (
    <span>
      { rendering }
    </span>
  );
};

PseudoChecker.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const mstp = ({ pseudoChecker }) => ({
  payload: pseudoChecker.payload,
  loading: pseudoChecker.loading,
});

export default connect(mstp)(PseudoChecker);
