import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import './OClock.scss';

import { displaySideButtonBarInfo, hideSideButtonBarInfo } from '../../actions';

const OClock = ({ displaySideButtonBarInfo: displaySBBI, hideSideButtonBarInfo: hideSBBI }) => (
  <FontAwesomeIcon
    className="ml-2 OClock"
    icon={faClock}
    size="2x"
    onMouseEnter={() => displaySBBI('oclock')}
    onMouseLeave={() => hideSBBI('oclock')}
  />
);

OClock.propTypes = {
  displaySideButtonBarInfo: PropTypes.func.isRequired,
  hideSideButtonBarInfo: PropTypes.func.isRequired,
};

const mdtp = dispatch => bindActionCreators({
  displaySideButtonBarInfo,
  hideSideButtonBarInfo,
}, dispatch);

export default connect(null, mdtp)(OClock);
