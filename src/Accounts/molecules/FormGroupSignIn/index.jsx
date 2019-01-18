import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { func } from 'prop-types';

import { userDataTypes } from '../../types';

import { FormGroupPassword, FormGroupPseudo } from '../..';

import { loginUser } from '../../actions';

class FormGroupSignIn extends Component {
  submitForm(e) {
    const {
      userData,
      loginUser: loginU,
    } = this.props;

    e.preventDefault();

    loginU(userData.pseudo, userData.password);
  }

  render() {
    return (
      <form onSubmit={e => this.submitForm(e)}>
        <FormGroupPseudo
          text="Indique ton pseudo"
          forProp="pseudo"
          colorLabel="white"
          noCheck
        />
        <FormGroupPassword
          text="Indique ton mot de passe"
          forProp="password"
          colorLabel="white"
        />
        <div className="text-center mt-5">
          <button type="submit" className="btn btn-success">Se connecter</button>
        </div>
      </form>
    );
  }
}

FormGroupSignIn.propTypes = {
  loginUser: func.isRequired,
  userData: userDataTypes.isRequired,
};

const mstp = ({ userData }) => ({
  userData,
});

const mdtp = dispatch => bindActionCreators({
  loginUser,
}, dispatch);

export default connect(mstp, mdtp)(FormGroupSignIn);
