import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

import { resetVoteData } from '../../actions';

class LogoutView extends Component {
  componentDidMount() {
    localStorage.removeItem('pseudo');
    localStorage.removeItem('email');
    this.props.resetVoteData();
  }

  render() {
    return (<Redirect to="/" />);
  }
}

LogoutView.propTypes = {
  resetVoteData: PropTypes.func.isRequired,
};

const mdtp = dispatch => bindActionCreators({ resetVoteData }, dispatch);

export default connect(null, mdtp)(LogoutView);
