import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import './MailToButton.scss';

import { displaySideButtonBarInfo, hideSideButtonBarInfo } from '../../actions';

const MailToButton = ({
  displaySideButtonBarInfo: displaySBBI, hideSideButtonBarInfo: hideSBBI
}) => (
  <a href={`mailto:?subject=Où%20déjeune-t-on%20ce%20midi?&body=Votez%20grâce%20à%20ce%20lien:%0D%0A%0D%0A${window.location.href}`}>
    <FontAwesomeIcon
      className="ml-2 MailToButton"
      icon={faPaperPlane}
      size="2x"
      onMouseEnter={() => displaySBBI('mailto')}
      onMouseLeave={() => hideSBBI('mailto')}
    />
  </a>
);

MailToButton.propTypes = {
  displaySideButtonBarInfo: PropTypes.func.isRequired,
  hideSideButtonBarInfo: PropTypes.func.isRequired,
};

const mdtp = dispatch => bindActionCreators({
  displaySideButtonBarInfo,
  hideSideButtonBarInfo,
}, dispatch);

export default connect(null, mdtp)(MailToButton);
