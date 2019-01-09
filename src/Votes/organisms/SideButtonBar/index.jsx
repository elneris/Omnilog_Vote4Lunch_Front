import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import {
  SideButtonGroup,
  SideButtonBarInfo,
} from '../..';

import './SideButtonBar.scss';

const SideButtonBar = ({ displayInfos }) => (
  <div className="SideButtonBar row mt-2 justify-content-center">
    <div className="ButtonBar col-10 col-md-8 text-center">
      <SideButtonGroup />
      {
        displayInfos
          ? (
            <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button" className="btn bg-lemon"><SideButtonBarInfo /></button>
            </div>
          )
          : ''
      }
    </div>
  </div>
);

SideButtonBar.propTypes = {
  displayInfos: PropTypes.bool.isRequired,
};

const mstp = ({
  votes,
}) => ({
  displayInfos: votes.sideButtonBarInfo.displayInfos,
});

export default connect(mstp)(SideButtonBar);
