import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

import './CopyTo.scss';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import { displaySideButtonBarInfo, hideSideButtonBarInfo } from '../../actions';

const CopyTo = ({
  displaySideButtonBarInfo: displaySBBI, hideSideButtonBarInfo: hideSBBI
}) => (
  <CopyToClipboard text={window.location.href}>
    <FontAwesomeIcon
      className="CopyTo"
      icon={faCopy}
      size="2x"
      onMouseEnter={() => displaySBBI('copyto')}
      onMouseLeave={() => hideSBBI('copyto')}
    />
  </CopyToClipboard>
);

CopyTo.propTypes = {
  displaySideButtonBarInfo: PropTypes.func.isRequired,
  hideSideButtonBarInfo: PropTypes.func.isRequired,
};

const mdtp = dispatch => bindActionCreators({
  displaySideButtonBarInfo,
  hideSideButtonBarInfo,
}, dispatch);

export default connect(null, mdtp)(CopyTo);
