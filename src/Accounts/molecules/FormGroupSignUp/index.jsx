import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { func } from 'prop-types';
import { addUserReducerTypes, userDataTypes } from '../../types';

import { FormGroupPassword, FormGroupPseudo, FormGroupEmail } from '../..';

import { addUser, resetPasswordData } from '../../actions';

class FormGroupSignUp extends Component {
  submitForm(e) {
    const {
      userData,
      addUser: addU,
      resetPasswordData: resetPData,
    } = this.props;

    e.preventDefault();

    addU(userData);
    resetPData();
  }

  render() {
    const { addUserReducer } = this.props;

    return (
      <form onSubmit={e => this.submitForm(e)}>

        <FormGroupPseudo text="Choisis ton pseudo" forProp="pseudo" colorLabel="white" />

        <FormGroupEmail text="Indique ton email" forProp="email" colorLabel="white" />

        <FormGroupPassword text="Choisis ton mot de passe" forProp="password" colorLabel="white" />

        <FormGroupPassword
          text="Répète ton mot de passe"
          forProp="passwordRepeater"
          colorLabel="white"
          repeater
        />
        <div className="text-center mt-5">
          <button type="submit" className="btn btn-success">{ !addUserReducer.loading ? 'Valider' : 'Requête en cours' }</button>
        </div>
      </form>
    );
  }
}

FormGroupSignUp.propTypes = {
  addUser: func.isRequired,
  resetPasswordData: func.isRequired,
  userData: userDataTypes.isRequired,
  addUserReducer: addUserReducerTypes.isRequired,
};

const mstp = ({ userData, addUser: addUserReducer }) => ({
  userData,
  addUserReducer,
});

const mdtp = dispatch => bindActionCreators({ addUser, resetPasswordData }, dispatch);

export default connect(mstp, mdtp)(FormGroupSignUp);
