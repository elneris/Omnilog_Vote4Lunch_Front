import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { func } from 'prop-types';

import { Redirect } from 'react-router-dom';

import { userDataTypes } from '../../types';

import { FormGroupSignIn } from '../..';

import { resetLoginFailure } from '../../actions';
import { onTopAlert, offTopAlert } from '../../../Core/actions';

import './SignIn.scss';

class SignIn extends Component {
  displayLoginError = () => {
    const {
      onTopAlert: onTA,
      offTopAlert: offTA,
      resetLoginFailure: resetLF,
    } = this.props;

    onTA('danger', 'votre pseudo ou votre mot de passe est erroné');
    resetLF();
    setTimeout(() => {
      offTA();
    }, 5000);
  }

  render() {
    const { userData } = this.props;

    if (userData.loginError) {
      this.displayLoginError();
    }

    if (userData.authenticated) {
      return (<Redirect to="/" />);
    }

    return (
      <div className="SignIn container-fluid">
        <div className="row no-gutters justify-content-center align-items-center h-100">
          <div
            xs="12"
            md="4"
            className="col-12 col-md-4 bg-blue p-5 rounded"
          >
            <FormGroupSignIn />
          </div>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  onTopAlert: func.isRequired,
  offTopAlert: func.isRequired,
  resetLoginFailure: func.isRequired,
  userData: userDataTypes.isRequired,
};

const mstp = ({ userData }) => ({
  userData,
});

const mdtp = dispatch => bindActionCreators({
  resetLoginFailure,
  onTopAlert,
  offTopAlert,
}, dispatch);

export default connect(mstp, mdtp)(SignIn);
