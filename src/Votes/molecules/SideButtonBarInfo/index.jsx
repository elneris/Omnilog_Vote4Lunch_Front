import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import {
  TimeToEnd,
} from '../..';

const SideButtonBarInfo = ({ element }) => {
  switch (element) {
    case 'oclock':
      return (<TimeToEnd />);
    case 'copyto':
      return (
        <p>Copier le lien du vote</p>
      );
    case 'mailto':
      return (
        <p>Partager le vote par mail</p>
      );
    default:
      return null;
  }
};

SideButtonBarInfo.propTypes = {
  element: PropTypes.string.isRequired,
};

const mstp = ({
  votes,
}) => ({
  element: votes.sideButtonBarInfo.element,
});

export default connect(mstp)(SideButtonBarInfo);
