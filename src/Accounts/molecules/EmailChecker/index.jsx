import React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { emailCheckerTypes } from '../../types';

import { ValueChecker } from '../../../Core';

const EmailChecker = ({ emailChecker }) => {
  if (emailChecker.loading) {
    return (
      <FontAwesomeIcon
        icon={faSpinner}
        spin
      />
    );
  }
  if (emailChecker.payload) {
    return (<ValueChecker check={false} />);
  }
  return (
    <ValueChecker check />
  );
};

EmailChecker.propTypes = {
  emailChecker: emailCheckerTypes.isRequired,
};

const mstp = ({ emailChecker }) => ({
  emailChecker,
});

export default connect(mstp)(EmailChecker);
